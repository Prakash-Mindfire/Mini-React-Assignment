import { createRoot } from 'react-dom/client'
import './index.css'
import APP from './APP.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx'
import { ToastProvider } from './context/ToastContext.tsx'
import { CommentsProvider } from './context/CommentsContext.tsx'

createRoot(document.getElementById('root')!).render(
    <ToastProvider>
      <FavoritesProvider>
        <CommentsProvider>
          <APP />
        </CommentsProvider>
      </FavoritesProvider>
    </ToastProvider>
)

