import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/Theme.context";

import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<App />
				<Toaster
					position="top-right"
					toastOptions={{
						className:
							"!bg-white !text-slate-900 dark:!bg-slate-900 dark:!text-white",
					}}
				/>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>,
);