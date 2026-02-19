export const PAGE_SIZE = 100;

export const statuses = [
    "scheduled",
    "active",
    "landed",
    "cancelled",
    "delayed",
];

export const STEPS = ["scheduled", "active", "landed", "canceled", "delayed"];

export const statusStyles: Record<string, string> = {
    active: "#2ecc71",
    scheduled: "#3498db",
    delayed: "#f39c12",
    landed: "#9b59b6",
    cancelled: "#e74c3c",
};