import { ThemeProvider } from "@/shared/context/ThemeContext";
import AppRoutes from "./routes";
import AppLayout from "@/shared/layout/AppLayout";
import { BrowserRouter } from "react-router-dom";

import "@/assets/css/App.css"

export default function APP() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </ AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}