import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Context providers
import { ThemeProvider } from "./Pages/ThemeContext.jsx";
import { ProjectProvider } from "<div className="" />
<pages></pages>/ProjectContext.jsx"; // ✅ check path

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
