/* 设计研究 · 自身现状覆盖（94 页抽样）。
 * 从 panorama/lightup-100/decisions-merged.json 抽出紧凑数据，不把整份 merged JSON 搬进仓库。
 * 只收录 present / attempted / near_benchmark；缩略图为对应页的 hero。
 */
window.VFX_LIGHTUP = {
  "updated_at": "2026-11-12 08:36 Asia/Shanghai",
  "timezone": "Asia/Shanghai",
  "reviewed": 94,
  "source": "设计 query 随机采样 · 现状",
  "counts": {
    "present": 0,
    "near_benchmark": 0,
    "attempted": 36,
    "none": 810,
    "pages_with_coverage": 27
  },
  "rows": [
    {
      "name": "液态玻璃与光学",
      "pages": [
        {
          "id": "unused_000022_q1",
          "presence": "attempted",
          "note": "中央头像/雕塑有虹彩外观，但看不出页内实现的透镜折射、色散或液态玻璃。"
        },
        {
          "id": "unused_000085_q1",
          "presence": "attempted",
          "note": "首屏右侧有若干大尺寸光滑球体，带弧形高光与内部偏蓝亮斑，外观接近玻璃/渐变装饰球；看不出页内实现的透镜折射、色散或液态玻璃。按装饰性渐变球体口径，不点亮。"
        },
        {
          "id": "unused_000104_q1",
          "presence": "attempted",
          "note": "首屏多枚高光球体带窗格般环境反射，比普通渐变球更接近玻璃/镀铬静帧；仍看不出页内透镜折射、色散或液态玻璃实现。按装饰性球体与 000022 虹彩静帧口径，不点亮。"
        }
      ]
    },
    {
      "name": "流体与着色器场",
      "pages": []
    },
    {
      "name": "光与发光",
      "pages": [
        {
          "id": "unused_000021_q1",
          "presence": "attempted",
          "note": "首屏柱状图卡片后的软紫光、滚动段节点高光与注释光迹，属常规装饰/标注，未到 bloom、体积光柱或氛围光晕的语言强度。"
        },
        {
          "id": "unused_000039_q1",
          "presence": "attempted",
          "note": "一体机后方有较大范围的紫红软光，属常见产品主视觉背光，未到地图所定义的辉光（bloom）、体积光柱或氛围光晕、让画面自己发亮的语言强度，不点亮。"
        },
        {
          "id": "unused_000057_q1",
          "presence": "attempted",
          "note": "晶体周围有淡紫光晕，属装饰性软光，未到辉光、体积光柱或氛围光晕的语言强度。"
        },
        {
          "id": "unused_000075_q1",
          "presence": "attempted",
          "note": "晶体边缘与周围有软光和高光星点，属装饰，未到辉光、体积光或氛围光口径。"
        },
        {
          "id": "unused_000085_q1",
          "presence": "attempted",
          "note": "球体内部的偏蓝亮斑与暗底软高光属装饰高光，未到 bloom、体积光柱或氛围光晕的语言强度。"
        }
      ]
    },
    {
      "name": "粒子与点云",
      "pages": [
        {
          "id": "unused_000021_q1",
          "presence": "attempted",
          "note": "滚动段可见数百枚紫色圆柱/圆片在透视下堆成圆形簇，并有高亮节点与路径光迹；按地图定义是成千上万个点组成形体、星系或把照片打散，此画面更接近数据可视化里的实例化物件，密度与形态都未到该语言，不点亮。"
        },
        {
          "id": "unused_000056_q1",
          "presence": "attempted",
          "note": "首屏下方可见一条由大量彩色方格组成的横向点阵带，中央收束成橙红黄圆形「核心」，两侧为蓝青色格点。按地图定义，「粒子与点云」是成千上万个点组成形体、星系、星环、点阵波浪或把照片打散；此画面是规则格点铺成的装饰带，方格尺度较大，更接近可视化热力/LED 墙图式，密度与形态都未到该语言，且不能从静帧证明是页内粒子系统，不点亮。"
        }
      ]
    },
    {
      "name": "图像与视频后期",
      "pages": [
        {
          "id": "unused_000081_q1",
          "presence": "attempted",
          "note": "首屏右侧是图像增强产品的前后对比滑杆：左半模糊带噪，右半更清晰。这是在演示修复/增强能力，对比图里的噪点属于「修复前」素材，不是页把扫描线、颗粒、故障或半色调当作自身视效语言。不点亮。"
        },
        {
          "id": "unused_000082_q1",
          "presence": "attempted",
          "note": "首屏与滚动段展示上色、风格转换、人像动漫化等 API 效果样张（含黑白/彩色对切）。这些是产品能力示例图，嵌在常规浅色排版与卡片里，不是页把扫描线、颗粒、故障或半色调当作自身视效语言。不点亮。"
        }
      ],
      "hint": "这两页是产品演示样张，不是页内后期语言。"
    },
    {
      "name": "生成艺术与程序化图形",
      "pages": [
        {
          "id": "unused_000056_q1",
          "presence": "attempted",
          "note": "点阵核心看起来像程序化像素场，但形态不是地图示例的等高线、线框形变、文字涡旋、程序化花海或波形；也不能从静帧证明由页内算法/着色器生成，可能只是设计好的镶嵌插画，不点亮。"
        }
      ]
    },
    {
      "name": "实时 3D · 写实材质与物件",
      "pages": [
        {
          "id": "unused_000016_q1",
          "presence": "attempted",
          "note": "两部带透视、简单高光与投影的手机模型，从静帧看是静态产品图拼装，不能证明实时 3D 或高阶材质。"
        },
        {
          "id": "unused_000018_q1",
          "presence": "attempted",
          "note": "双手机模型与编辑卡片上的渐变球体，均像静态插画/产品图，不能证明实时 3D 或高阶材质。"
        },
        {
          "id": "unused_000019_q1",
          "presence": "attempted",
          "note": "滚动段中心是带高光的青绿–蓝光滑渐变球体，外环轨道线与能力标签，属装饰性渐变球体，不能证明实时 3D 或写实材质。"
        },
        {
          "id": "unused_000020_q1",
          "presence": "attempted",
          "note": "球体像径向渐变装饰，不能证明实时 3D 或写实材质。"
        },
        {
          "id": "unused_000022_q1",
          "presence": "attempted",
          "note": "虹彩/全息质感物件是静帧，无法证明为页内实时 3D / PBR，不点亮。"
        },
        {
          "id": "unused_000025_q1",
          "presence": "attempted",
          "note": "等轴测方块阶梯与机械臂是风格化插画/产品图，简单阴影，不能证明实时 3D 或写实材质。"
        },
        {
          "id": "unused_000028_q1",
          "presence": "attempted",
          "note": "云+硬盘是风格化 3D 图标（圆润塑料感、软阴影），属常见静态产品图标，不能证明实时 3D 或写实 PBR。"
        },
        {
          "id": "unused_000036_q1",
          "presence": "attempted",
          "note": "滚动段千帆卡上的紫色渐变球体、云服务器卡上的风格化设备示意，属装饰/产品插画，不点亮写实材质。"
        },
        {
          "id": "unused_000039_q1",
          "presence": "attempted",
          "note": "右侧是带屏幕与键盘的一体机/显示器产品模型，屏幕为仪表盘 UI。静态产品模型，与 App Store Today 类手机模型同类，不能从静帧证明为页内实时 3D / PBR，不点亮。"
        },
        {
          "id": "unused_000047_q1",
          "presence": "attempted",
          "note": "滚动段「号码认证」卡里有静态手机模型展示来电界面，与 App Store Today 类产品图同类，不点亮实时 3D。"
        },
        {
          "id": "unused_000054_q1",
          "presence": "attempted",
          "note": "中央是静态手机模型展示 App 界面，与 App Store Today 类产品图同类，不点亮实时 3D。"
        },
        {
          "id": "unused_000057_q1",
          "presence": "attempted",
          "note": "低多边形晶体是风格化装饰物件静帧，无法证明为页内实时 3D / PBR，不点亮。"
        },
        {
          "id": "unused_000066_q1",
          "presence": "attempted",
          "note": "风格化剪影与渐变球体，不是写实材质；也不能从静帧证明为页内实时 3D。"
        },
        {
          "id": "unused_000074_q1",
          "presence": "attempted",
          "note": "是风格化、带横纹的晶体/水滴静帧，不是写实材质；也不能从静帧证明为页内实时 3D，按口径不点亮。"
        },
        {
          "id": "unused_000075_q1",
          "presence": "attempted",
          "note": "低多边形风格化晶体静帧，常见装饰图标，不是写实材质；不能从静帧证明为页内实时 3D，不点亮。"
        },
        {
          "id": "unused_000085_q1",
          "presence": "attempted",
          "note": "球体为静帧装饰物，不能从静帧证明为页内实时 3D / PBR，不点亮。"
        },
        {
          "id": "unused_000092_q1",
          "presence": "attempted",
          "note": "首屏右侧平板设备框是静态产品模型/界面拼装，不点亮实时 3D。"
        },
        {
          "id": "unused_000101_q1",
          "presence": "attempted",
          "note": "首屏笔记本与手机是静态设备模型/产品图拼装，不点亮实时 3D。"
        },
        {
          "id": "unused_000104_q1",
          "presence": "attempted",
          "note": "球体反射看起来像预渲染材质，但不能从静帧证明为页内实时 3D / PBR，不点亮。"
        },
        {
          "id": "unused_000105_q1",
          "presence": "attempted",
          "note": "首屏卡片内是浅色等轴测层叠方板插画，按等轴测插画口径不点亮实时 3D。"
        },
        {
          "id": "unused_000108_q1",
          "presence": "attempted",
          "note": "控制台两侧各有一枚圆角立体图标砖（层叠与云），属风格化 3D 产品图标，不点亮写实材质或实时 3D。"
        },
        {
          "id": "unused_000111_q1",
          "presence": "attempted",
          "note": "首屏多台手机是静态产品模型拼装，按 App Store Today 口径不点亮实时 3D。"
        },
        {
          "id": "unused_000112_q1",
          "presence": "attempted",
          "note": "首屏是一台透视摆放的机架服务器产品图（金属机箱、硬盘位、高光与投影），周围有风格化应用图标。是静帧产品图，不能证明页内实时 3D / PBR，不点亮。"
        }
      ]
    },
    {
      "name": "实时 3D · 场景与世界",
      "pages": []
    },
    {
      "name": "物理与软体模拟",
      "pages": []
    }
  ],
  "pages": {
    "unused_000016_q1": {
      "title": "App Store 今日 — 发现下一款心动 App",
      "thumb": "thumbs/vfx/lightup/unused_000016_q1-hero.jpg"
    },
    "unused_000018_q1": {
      "title": "App Store Today · 今日精选",
      "thumb": "thumbs/vfx/lightup/unused_000018_q1-hero.jpg"
    },
    "unused_000019_q1": {
      "title": "芯云模体 · 百度智能云全栈 AI 云",
      "thumb": "thumbs/vfx/lightup/unused_000019_q1-hero.jpg"
    },
    "unused_000020_q1": {
      "title": "芯云模体 · 新全栈 AI 云｜百度智能云",
      "thumb": "thumbs/vfx/lightup/unused_000020_q1-hero.jpg"
    },
    "unused_000021_q1": {
      "title": "百度智能云 · 产品目录与能力导航",
      "thumb": "thumbs/vfx/lightup/unused_000021_q1-hero.jpg"
    },
    "unused_000022_q1": {
      "title": "芯云模体 · 全栈 AI 云解决方案目录 | 百度智能云",
      "thumb": "thumbs/vfx/lightup/unused_000022_q1-hero.jpg"
    },
    "unused_000025_q1": {
      "title": "百舸 AI 计算平台 · 把万卡集群变成一台计算机",
      "thumb": "thumbs/vfx/lightup/unused_000025_q1-hero.jpg"
    },
    "unused_000028_q1": {
      "title": "云硬盘 CBS · 高性能持久化块存储 | 云枢云",
      "thumb": "thumbs/vfx/lightup/unused_000028_q1-hero.jpg"
    },
    "unused_000036_q1": {
      "title": "新用户超省季｜限时体验百度智能云",
      "thumb": "thumbs/vfx/lightup/unused_000036_q1-hero.jpg"
    },
    "unused_000039_q1": {
      "title": "百度百舸一体机 · AI 算力，开箱即用",
      "thumb": "thumbs/vfx/lightup/unused_000039_q1-hero.jpg"
    },
    "unused_000047_q1": {
      "title": "客悦ONE｜全矩阵智能通信服务",
      "thumb": "thumbs/vfx/lightup/unused_000047_q1-hero.jpg"
    },
    "unused_000054_q1": {
      "title": "百度智能云福宝 · 智慧养老解决方案",
      "thumb": "thumbs/vfx/lightup/unused_000054_q1-hero.jpg"
    },
    "unused_000056_q1": {
      "title": "GRIDX E1 边缘计算单元｜让算力抵达现场",
      "thumb": "thumbs/vfx/lightup/unused_000056_q1-hero.jpg"
    },
    "unused_000057_q1": {
      "title": "聆语 LINGYU · 实时语音识别 API",
      "thumb": "thumbs/vfx/lightup/unused_000057_q1-hero.jpg"
    },
    "unused_000066_q1": {
      "title": "声屿 SONORA · 让每一句文字自然开口说话",
      "thumb": "thumbs/vfx/lightup/unused_000066_q1-hero.jpg"
    },
    "unused_000074_q1": {
      "title": "短语音识别极速版 · 60 秒语音，1 秒成文 | 声智云",
      "thumb": "thumbs/vfx/lightup/unused_000074_q1-hero.jpg"
    },
    "unused_000075_q1": {
      "title": "声迹 VOXTRACE · 实时语音识别",
      "thumb": "thumbs/vfx/lightup/unused_000075_q1-hero.jpg"
    },
    "unused_000081_q1": {
      "title": "澄像 LUMEN — 让每一张图片恢复清晰细节",
      "thumb": "thumbs/vfx/lightup/unused_000081_q1-hero.jpg"
    },
    "unused_000082_q1": {
      "title": "PRISM 图像特效 API — 让图像，再想象一次",
      "thumb": "thumbs/vfx/lightup/unused_000082_q1-hero.jpg"
    },
    "unused_000085_q1": {
      "title": "教育场景文字识别 · 智识 OCR",
      "thumb": "thumbs/vfx/lightup/unused_000085_q1-hero.jpg"
    },
    "unused_000092_q1": {
      "title": "燧识 SUI — 离线文字识别 SDK",
      "thumb": "thumbs/vfx/lightup/unused_000092_q1-hero.jpg"
    },
    "unused_000101_q1": {
      "title": "语言理解技术 - 百度AI开放平台",
      "thumb": "thumbs/vfx/lightup/unused_000101_q1-hero.jpg"
    },
    "unused_000104_q1": {
      "title": "弹性裸金属服务器 · 云枢算力 CloudNexus",
      "thumb": "thumbs/vfx/lightup/unused_000104_q1-hero.jpg"
    },
    "unused_000105_q1": {
      "title": "DCC 专属计算集群 · NOVA CLOUD",
      "thumb": "thumbs/vfx/lightup/unused_000105_q1-hero.jpg"
    },
    "unused_000108_q1": {
      "title": "COS 云编排服务 · 让云资源部署更简单",
      "thumb": "thumbs/vfx/lightup/unused_000108_q1-hero.jpg"
    },
    "unused_000111_q1": {
      "title": "百度云手机 · 让手机算力随时在线",
      "thumb": "thumbs/vfx/lightup/unused_000111_q1-hero.jpg"
    },
    "unused_000112_q1": {
      "title": "磐玉蜂巢服务器 · ARM 仿生算力，驱动云边协同新基建",
      "thumb": "thumbs/vfx/lightup/unused_000112_q1-hero.jpg"
    }
  }
};
