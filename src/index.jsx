/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";

import "./index.css";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Edit from "./pages/Edit";

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
        <Route path="/" component={Start} />
        <Route path="/login" component={Login} />
        <Route path="/edit" component={Edit} />
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
