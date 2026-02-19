export const statusColor = (status: string) => {
  switch (status) {
    case "active":
      return "green";
    case "delayed":
      return "orange";
    case "landed":
      return "blue";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};
