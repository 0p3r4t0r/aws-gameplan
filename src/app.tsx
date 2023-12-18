import React from 'react';
import { createRoot } from 'react-dom/client';
import FirstFlow from './components/FirstFlow';

import 'reactflow/dist/style.css';

const rootDomNode = document.getElementById('root')!;
createRoot(rootDomNode).render(<FirstFlow />);