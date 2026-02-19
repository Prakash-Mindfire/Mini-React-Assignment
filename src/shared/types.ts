import type { ReactNode } from "./deps";

export type AirlineLogoProp = {
    iata: string;
    name: string;
};
export type FlightTimelineProp = {
    departure: string;
    arrival: string;
};

export type InfoRow = {
  label: string;
  value?: ReactNode;
};

export type InfoCardProps = {
  title: string;
  rows?: InfoRow[];
  children ?: ReactNode;
};

export type StatusTimelineProps = {
  status: string;
};

// Toast
export type ToastType = "success" | "error" | "info";

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastOptions = {
  id?: string;
  duration?: number;
  action?: ToastAction;
};

export type Toast = {
  id: string;
  message: React.ReactNode;
  type: ToastType;
  action?: ToastAction;
};

export type ToastContextType = {
  showToast: (
    message: React.ReactNode,
    type?: ToastType,
    options?: ToastOptions
  ) => void;
};