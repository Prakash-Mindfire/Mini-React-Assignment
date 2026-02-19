import { createContext, useContext, useState } from "react";
import type { Toast, ToastContextType, ToastOptions, ToastType } from "../types";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: React.ReactNode,
    type: ToastType = "info",
    options?: ToastOptions
  ) => {
    const id = options?.id ?? crypto.randomUUID();

    setToasts((prev) => [
      ...prev.filter((t) => t.id !== id), // 🔥 replace if exists
      { id, message, type, action: options?.action },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options?.duration ?? 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => {
          const action = toast.action;

          return (
            <div key={toast.id} className={`toast ${toast.type}`}>
              <div className="toast-content">{toast.message}</div>

              {action && (
                <button
                  className="toast-action"
                  onClick={() => {
                    action.onClick();
                    setToasts((prev) =>
                      prev.filter((t) => t.id !== toast.id)
                    );
                  }}
                >
                  {action.label}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
