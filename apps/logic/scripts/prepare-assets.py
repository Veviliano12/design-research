#!/usr/bin/env python3
"""Copy real captures into this app and build a presentation catalog.

Counts are recomputed from the JSON we actually ship. If a title number
would not match the locked narrative, this script fails instead of fudging.
"""
from __future__ import annotations

import json
import shutil
import sys
from collections import Counter, defaultdict
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "src" / "data" / "raw"
PUBLIC = ROOT / "public"
GEN = PUBLIC / "generated"
CASES_DEST = GEN / "cases"
LIGHTUP_DEST = GEN / "lightup"

MONO = ROOT.parents[1]
DR_THUMBS = MONO / "site" / "thumbs" / "vfx"
DR_LIGHTUP = DR_THUMBS / "lightup"
CIN_CASES = MONO / "apps" / "library" / "public" / "generated" / "cases"
CIN_LIGHTUP = MONO / "apps" / "library" / "public" / "generated" / "lightup"

EXPECTED_LANG_COUNTS = {
    "液态玻璃与光学": 19,
    "流体与着色器场": 11,
    "光与发光": 15,
    "粒子与点云": 9,
    "图像与视频后期": 24,
    "生成艺术与程序化图形": 1,
    "实时 3D · 写实材质与物件": 32,
    "实时 3D · 场景与世界": 11,
    "物理与软体模拟": 2,
}

LANG_SLUGS = {
    "液态玻璃与光学": "liquid-glass",
    "流体与着色器场": "fluid-shader",
    "光与发光": "light",
    "粒子与点云": "particles",
    "图像与视频后期": "post",
    "生成艺术与程序化图形": "generative",
    "实时 3D · 写实材质与物件": "realtime-object",
    "实时 3D · 场景与世界": "realtime-world",
    "物理与软体模拟": "physics",
}

LANG_SHORT = {
    "液态玻璃与光学": "液态玻璃",
    "流体与着色器场": "流体",
    "光与发光": "光与发光",
    "粒子与点云": "粒子",
    "图像与视频后期": "后期",
    "生成艺术与程序化图形": "生成艺术",
    "实时 3D · 写实材质与物件": "写实材质",
    "实时 3D · 场景与世界": "场景与世界",
    "物理与软体模拟": "物理",
}

# One-sentence variant captions, built from the map's own language definitions.
LANG_CAPTIONS = {
    "液态玻璃与光学": "折射、色散、透镜材质，这类语言靠页里的光学现象本身成立。",
    "流体与着色器场": "流动背景、液态金属、着色器场，画面在完整页面或组件里持续流动。",
    "光与发光": "辉光、体积光、氛围光，让画面自己发亮。",
    "粒子与点云": "星尘、点阵、打散重组，由大量的点组成形体。",
    "图像与视频后期": "扫描线、颗粒、故障、半色调，把后期语言当作页面自身的视效。",
    "生成艺术与程序化图形": "由算法生成的图形与结构，而不是预先画好的装饰。",
    "实时 3D · 写实材质与物件": "单个物件的实时 3D 与写实材质，发生在完整页面或组件里。",
    "实时 3D · 场景与世界": "完整的实时 3D 环境，而不只是一件孤立的物件。",
    "物理与软体模拟": "布料、沙子、软体等物理计算，在页内被模拟出来。",
}

# Fan-stack heroes: real captures, same aspect, never the missing Dark Souls thumb.
BENCHMARK_FAN_IDS = [
    "apple-iphone-18-pro",
    "apple-music",
    "studio-lusion-atlas-motion",
]
# Current-work thumbs only, never benchmark shots.
SELF_FAN_IDS = [
    "unused_000016_q1",
    "unused_000022_q1",
    "unused_000056_q1",
]

MISSING_ID = "threeui-dark-souls-holo"
MISSING_LABEL = "暂无现场截图"

UNSEEN_NAMES = ["流体与着色器场", "实时 3D · 场景与世界", "物理与软体模拟"]


def fail(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(1)


def measure(path: Path) -> dict:
    with Image.open(path) as im:
        w, h = im.size
    return {
        "width": w,
        "height": h,
        "aspect": round(w / h, 3),
    }


def choose_case_source(case_id: str) -> Path | None:
    """Best available real capture, preferring higher-res design-research files."""
    candidates = [
        DR_THUMBS / f"{case_id}.full.webp",
        CIN_CASES / case_id / "full-960.webp",
        DR_THUMBS / f"{case_id}.webp",
        CIN_CASES / case_id / "full-480.webp",
        CIN_CASES / case_id / "thumb-480.webp",
    ]
    for p in candidates:
        if p.exists() and p.stat().st_size > 0:
            return p
    return None


def choose_lightup_source(page_id: str) -> Path | None:
    candidates = [
        CIN_LIGHTUP / page_id / "hero-960.jpg",
        DR_LIGHTUP / f"{page_id}-hero.jpg",
        CIN_LIGHTUP / page_id / "hero-480.jpg",
    ]
    for p in candidates:
        if p.exists() and p.stat().st_size > 0:
            return p
    return None


def copy_hero(src: Path, dest: Path) -> dict:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    info = measure(dest)
    info["file"] = str(dest.relative_to(PUBLIC))
    return info


def asset_url(rel: str) -> str:
    return rel  # app prefixes import.meta.env.BASE_URL


def main() -> None:
    cases_doc = json.loads((RAW / "cases.json").read_text(encoding="utf-8"))
    lightup_doc = json.loads((RAW / "lightup.json").read_text(encoding="utf-8"))

    if GEN.exists():
        shutil.rmtree(GEN)
    CASES_DEST.mkdir(parents=True)
    LIGHTUP_DEST.mkdir(parents=True)

    cases = cases_doc["cases"]
    if len(cases) != 124:
        fail(f"shipped cases.json has {len(cases)} rows, expected 124")

    row_counts = Counter(c["row"] for c in cases)
    if dict(row_counts) != EXPECTED_LANG_COUNTS:
        fail(f"language breakdown mismatch: {dict(row_counts)}")
    if sum(row_counts.values()) != 124:
        fail("language counts do not sum to 124")

    kind_counts = Counter(c["kind"] for c in cases)
    core_counts = Counter(c["core"] for c in cases)
    scale_counts = Counter(c["scale"] for c in cases)
    landing = sum(1 for c in cases if "落地页" in (c.get("scenes") or []))
    if landing != 105:
        fail(f"landing-page count is {landing}, expected 105")

    missing = [c for c in cases if c.get("missingCapture") or c["id"] == MISSING_ID]
    if len(missing) != 1 or missing[0]["id"] != MISSING_ID:
        fail(f"missing-capture set unexpected: {[c['id'] for c in missing]}")

    images = {}
    for c in cases:
        cid = c["id"]
        if cid == MISSING_ID or c.get("missingCapture"):
            if choose_case_source(cid) is not None:
                fail(f"{cid} is marked missing but an image file was found; will not ship a substitute")
            continue
        src = choose_case_source(cid)
        if src is None:
            fail(f"{cid} has no capture file; cannot invent or substitute an image")
        dest = CASES_DEST / cid / ("hero" + src.suffix.lower())
        images[cid] = copy_hero(src, dest)

    if len(images) != 123:
        fail(f"copied {len(images)} case images, expected 123")

    # Light-up pages
    lu_counts = lightup_doc["counts"]
    reviewed = lightup_doc["reviewed"]
    if reviewed != 94:
        fail(f"reviewed is {reviewed}, expected 94")
    if lu_counts.get("present") != 0 or lu_counts.get("near_benchmark") != 0:
        fail(f"present/near_benchmark not both 0: {lu_counts}")
    if lu_counts.get("attempted") != 36:
        fail(f"attempted is {lu_counts.get('attempted')}, expected 36")
    if lu_counts.get("pages_with_coverage") != 27:
        fail(f"pages_with_coverage is {lu_counts.get('pages_with_coverage')}, expected 27")

    lu_images = {}
    attempted_items = []
    attempted_pages = set()
    attempted_by_lang = defaultdict(list)

    for row in lightup_doc["rows"]:
        lang = row["name"]
        for p in row["pages"]:
            if p["presence"] != "attempted":
                # We only ship attempted items as current-work evidence.
                # Other presence values must not be silently dropped if they appear later.
                if p["presence"] in ("present", "near_benchmark"):
                    fail(f"unexpected non-zero presence {p['presence']} on {p['id']}")
                continue
            pid = p["id"]
            page_meta = lightup_doc["pages"][pid]
            if pid not in lu_images:
                src = choose_lightup_source(pid)
                if src is None:
                    fail(f"lightup page {pid} has no current-work thumb")
                dest = LIGHTUP_DEST / pid / ("hero" + src.suffix.lower())
                lu_images[pid] = copy_hero(src, dest)
            item = {
                "id": f"{pid}::{LANG_SLUGS[lang]}",
                "pageId": pid,
                "title": page_meta["title"],
                "language": lang,
                "languageId": LANG_SLUGS[lang],
                "presence": p["presence"],
                "note": p.get("note") or "",
                "image": lu_images[pid],
            }
            attempted_items.append(item)
            attempted_by_lang[lang].append(item)
            attempted_pages.add(pid)

    if len(attempted_items) != 36:
        fail(f"attempted items {len(attempted_items)}, expected 36")
    if len(attempted_pages) != 27:
        fail(f"unique attempted pages {len(attempted_pages)}, expected 27")

    attempted_langs = [name for name, items in attempted_by_lang.items() if items]
    unseen = [name for name in EXPECTED_LANG_COUNTS if name not in attempted_by_lang or not attempted_by_lang[name]]
    if set(unseen) != set(UNSEEN_NAMES):
        fail(f"unseen languages {unseen}, expected {UNSEEN_NAMES}")
    if len(attempted_langs) != 6:
        fail(f"attempted languages {len(attempted_langs)}, expected 6")

    # Fan stacks must share one aspect and use only real, allowed images.
    def fan_from_cases(ids):
        frames = []
        aspects = set()
        for cid in ids:
            if cid not in images:
                fail(f"fan hero {cid} has no shipped image")
            info = images[cid]
            aspects.add(info["aspect"])
            case = next(c for c in cases if c["id"] == cid)
            frames.append({"id": cid, "name": case["name"], "image": info, "row": case["row"]})
        if len(aspects) != 1:
            fail(f"fan stack mixed aspects {aspects}")
        return frames

    def fan_from_lightup(ids):
        frames = []
        aspects = set()
        for pid in ids:
            if pid not in lu_images:
                fail(f"self fan {pid} has no current-work thumb")
            info = lu_images[pid]
            aspects.add(info["aspect"])
            title = lightup_doc["pages"][pid]["title"]
            frames.append({"id": pid, "name": title, "image": info})
        if len(aspects) != 1:
            fail(f"self fan mixed aspects {aspects}")
        return frames

    benchmark_fan = fan_from_cases(BENCHMARK_FAN_IDS)
    self_fan = fan_from_lightup(SELF_FAN_IDS)

    languages = []
    for row in cases_doc["rows"]:
        name = row["name"]
        slug = LANG_SLUGS[name]
        row_cases = []
        for c in cases:
            if c["row"] != name:
                continue
            missing_capture = bool(c.get("missingCapture") or c["id"] == MISSING_ID)
            row_cases.append(
                {
                    "id": c["id"],
                    "name": c["name"],
                    "url": c.get("url") or "",
                    "studio": c.get("studio") or "",
                    "row": c["row"],
                    "scenes": c.get("scenes") or [],
                    "scale": c.get("scale") or "",
                    "kind": c.get("kind") or "",
                    "core": c.get("core") or "",
                    "reason": c.get("reason") or "",
                    "note": c.get("note") or "",
                    "captureNote": c.get("capture_note") or "",
                    "imageNote": c.get("image_note") or "",
                    "missingCapture": missing_capture,
                    "missingLabel": c.get("missingLabel") or (MISSING_LABEL if missing_capture else ""),
                    "image": None if missing_capture else images[c["id"]],
                }
            )
        hero = next((c for c in row_cases if not c["missingCapture"] and c["image"]), None)
        if hero is None:
            fail(f"language {name} has no real hero capture")
        languages.append(
            {
                "id": slug,
                "no": f"{len(languages)+1:02d}",
                "name": name,
                "short": LANG_SHORT[name],
                "desc": row["desc"],
                "caption": LANG_CAPTIONS[name],
                "count": len(row_cases),
                "heroId": hero["id"],
                "hero": hero["image"],
                "cases": row_cases,
            }
        )
        if len(row_cases) != EXPECTED_LANG_COUNTS[name]:
            fail(f"{name} shipped {len(row_cases)}, expected {EXPECTED_LANG_COUNTS[name]}")

    if len(languages) != 9:
        fail(f"language count is {len(languages)}, expected 9")

    # Self scenes
    attempted_scene_items = []
    for name in EXPECTED_LANG_COUNTS:
        for item in attempted_by_lang.get(name, []):
            attempted_scene_items.append(item)

    post_notes = [it for it in attempted_scene_items if it["language"] == "图像与视频后期"]
    if len(post_notes) != 2:
        fail(f"图像与视频后期 attempted items {len(post_notes)}, expected 2")
    for it in post_notes:
        if "不是页把扫描线、颗粒、故障或半色调当作自身视效语言" not in it["note"]:
            fail(f"post item {it['pageId']} is missing the original image-API note")

    self_scenes = [
        {
            "id": "attempted",
            "no": "01",
            "name": "做了但不够",
            "caption": "朝这个方向做了，但还不能算已具备。",
            "languageCount": 6,
            "itemCount": 36,
            "pageCount": 27,
            "hero": attempted_scene_items[0]["image"],
            "items": attempted_scene_items,
            "languages": [
                {
                    "id": LANG_SLUGS[name],
                    "name": name,
                    "short": LANG_SHORT[name],
                    "count": len(attempted_by_lang[name]),
                }
                for name in EXPECTED_LANG_COUNTS
                if attempted_by_lang.get(name)
            ],
        },
        {
            "id": "unseen",
            "no": "02",
            "name": "未见",
            "caption": "抽样里还没见到，不拿标杆图填上。",
            "languageCount": 3,
            "languages": [
                {
                    "id": LANG_SLUGS[name],
                    "name": name,
                    "short": LANG_SHORT[name],
                }
                for name in UNSEEN_NAMES
            ],
            "hero": None,
            "items": [],
            "emptyKind": "pending",
            "emptyLabel": "待补充",
        },
        {
            "id": "lit",
            "no": "03",
            "name": "点亮与接近标杆",
            "caption": "还没有。",
            "present": 0,
            "nearBenchmark": 0,
            "hero": None,
            "items": [],
            "emptyKind": "none",
            "emptyLabel": "还没有",
        },
    ]

    catalog = {
        "source": {
            "cases": "src/data/raw/cases.json",
            "lightup": "src/data/raw/lightup.json",
            "images": "public/generated/ (real captures only; placeholders stay in the catalog, not in this folder)",
        },
        "counts": {
            "onWall": 124,
            "withCapture": 123,
            "missingCapture": 1,
            "languages": 9,
            "vfxKind": kind_counts.get("视效", 0),
            "visualRefKind": kind_counts.get("视觉参考", 0),
            "core": core_counts.get("核心", 0),
            "decor": core_counts.get("装饰", 0),
            "fullPage": scale_counts.get("整页", 0),
            "component": scale_counts.get("组件", 0),
            "landingPages": landing,
            "reviewed": 94,
            "present": 0,
            "nearBenchmark": 0,
            "attempted": 36,
            "attemptedPages": 27,
            "attemptedLanguages": 6,
            "unseenLanguages": 3,
        },
        "missing": {
            "id": MISSING_ID,
            "label": MISSING_LABEL,
        },
        "languages": languages,
        "categories": [
            {
                "id": "benchmarks",
                "no": "01",
                "name": "已上墙标杆",
                "sceneCount": 9,
                "sceneLabel": "9 种视效语言",
                "fan": benchmark_fan,
                "kind": "benchmarks",
            },
            {
                "id": "self",
                "no": "02",
                "name": "自身抽样",
                "sceneCount": 3,
                "sceneLabel": "做了但不够、未见、点亮与接近标杆",
                "tease": "94 页里，点亮和接近标杆都是 0。",
                "fan": self_fan,
                "kind": "self",
            },
        ],
        "selfScenes": self_scenes,
        "capabilities": [
            {
                "id": "gate",
                "no": "01",
                "short": "关口",
                "full": "好看，且必须在完整页面或组件里",
                "role": "看起来高级还不够；引擎或 playground 的场景照过不了关。",
                "draft": "gate",
                "passedExampleId": "apple-iphone-18-pro",
            },
            {
                "id": "classify",
                "no": "02",
                "short": "分类",
                "full": "按视效语言分类，不按动效",
                "role": "分类轴是语言；动效不是一类。案例先行，先粗分，样本多了再修订。",
                "draft": "classify",
            },
            {
                "id": "wall",
                "no": "03",
                "short": "上墙",
                "full": "同一来源也要逐页看，过关才上墙",
                "role": "不把整站当成一条结论；还在审、尚未上墙的不计入地图上的 124。",
                "draft": "wall",
            },
            {
                "id": "coverage",
                "no": "04",
                "short": "覆盖",
                "full": "对照自身时分三层，不称已掌握",
                "role": "点亮是这种语言已经出现，即使还不够标杆；做了但不够单独标出；接近标杆另记。三层都不等于已掌握。",
                "draft": "coverage",
            },
        ],
        "chapters": [
            {
                "id": "results",
                "no": "01",
                "nav": "成果展",
                "subtitle": "高阶视效地图",
                "title": "已上墙 124 条标杆，自身抽样还没有点亮。",
                "kind": "results",
            },
            {
                "id": "method",
                "no": "02",
                "nav": "能力论证",
                "subtitle": "研究逻辑",
                "title": "先过关口，按语言归类，过关才上墙，再用三层对照自身。",
                "kind": "method",
            },
        ],
        "hiddenChapters": [
            {
                "id": "compare",
                "no": "03",
                "nav": "对照",
                "hidden": True,
                "reason": "没有接近标杆的成对对照，不能把「做了但不够」排成已完成的左右对比。",
            }
        ],
    }

    # Final title-number guard
    title = catalog["chapters"][0]["title"]
    if "124" not in title or catalog["counts"]["onWall"] != 124:
        fail("results title count does not match shipped on-wall count")
    if catalog["counts"]["present"] != 0 or catalog["counts"]["nearBenchmark"] != 0:
        fail("cannot claim 还没有点亮 unless present and near_benchmark are 0")

    out = ROOT / "src" / "data" / "catalog.json"
    out.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("catalog written:", out)
    print("case images:", len(images), "lightup images:", len(lu_images))
    print("counts:", json.dumps(catalog["counts"], ensure_ascii=False))


if __name__ == "__main__":
    main()
