import React from 'react';
import { createRoot } from 'react-dom/client';
import Flow from './components/Flow';

import 'reactflow/dist/style.css';

const rootDomNode = document.getElementById('root')!;
createRoot(rootDomNode).render(<Flow />);