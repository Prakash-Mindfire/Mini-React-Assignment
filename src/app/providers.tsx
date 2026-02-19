import type { ReactNode } from "react";
import { ToastProvider } from "@/shared/context/ToastContext";
import { FavoritesProvider } from "@/features";
import { CommentsProvider } from "@/features/comments/context/CommentsContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <FavoritesProvider>
        <CommentsProvider>
          {children}
        </CommentsProvider>
      </FavoritesProvider>
    </ToastProvider>
  );
}
