import React from 'react';
import { createRoot } from 'react-dom/client';
import MainFlow from './components/MainFlow';

import 'reactflow/dist/style.css';

const rootDomNode = document.getElementById('root')!;
createRoot(rootDomNode).render(<MainFlow />);