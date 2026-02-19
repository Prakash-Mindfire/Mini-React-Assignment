import { createRoot } from 'react-dom/client'
import './index.css'
import "./i18n";
import APP from './app/app.tsx'
import AppProviders from './app/providers.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <APP />
  </AppProviders>
)