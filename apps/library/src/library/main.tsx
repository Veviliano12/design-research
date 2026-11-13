import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LibraryApp } from './LibraryApp';

const root = document.getElementById('root');
if (!root) throw new Error('缺少 #root 节点');

createRoot(root).render(
  <StrictMode>
    <LibraryApp />
  </StrictMode>,
);
