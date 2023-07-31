/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/login" component={App} />
        <Route path="/edit" component={App} />
        <Route
          path="*"
          element={
            <div class="text-white font-sans w-screen h-screen flex items-center justify-center text-4xl flex-col gap-16">
              404
              <div class="w-[90%] max-w-xs">
                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  class="w-full rounded-2xl text-lg bg-gradient-to-t py-4 from-amber-600 to-amber-500 border border-amber-500 active:scale-95 transition-all"
                >
                  Zurück
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  ),
  root
);
