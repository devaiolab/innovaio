import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './scripts/initializeData'

createRoot(document.getElementById("root")!).render(<App />);
