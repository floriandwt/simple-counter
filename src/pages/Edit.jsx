import Odometer from "odometer";
import Preset from "../config/counter.preset.json";
import "odometer/themes/odometer-theme-default.css";
import { createEffect, createSignal, onCleanup } from "solid-js";

export default function Edit() {
  let number;
  let [value, setValue] = createSignal(0);

  // Initialize Odometer once on component mount
  let odometerInstance;

  // Update Odometer value whenever value signal changes
  createEffect(() => {
    if (odometerInstance) {
      odometerInstance.update(value());
    } else {
      odometerInstance = new Odometer({
        el: number,
        value: value(),
        theme: "default",
        format: "",
        duration: 10,
      });
    }
  });

  return (
    <main class="w-screen h-screen font-sans bg-black text-white">
      <div class="w-[90%] mx-auto py-20 h-screen flex flex-col justify-between">
        <div>
          <h1 class="text-center text-3xl mb-16">
            {localStorage.getItem("simple-counter-user")}
          </h1>
          <div class="w-full pt-8 pb-4 flex items-center justify-between">
            <button
              class="text-5xl bg-white rounded-full w-14 h-14 flex items-center justify-center text-black active:scale-95 transition-all"
              onClick={() => {
                if (value() > 0) setValue(value() - 1);
              }}
            >
              -
            </button>
            <div ref={number} id="odometer" class="font-sans text-8xl">
              {value()}
            </div>
            <button
              class="text-5xl bg-white rounded-full w-14 h-14 flex items-center justify-center text-black active:scale-95 transition-all"
              onClick={() => {
                setValue(value() + 1);
              }}
            >
              +
            </button>
          </div>
          <p class="text-4xl text-center max-[320px]:hidden">
            x {Preset.unit.symbol} {Preset.unit.name}
          </p>
        </div>
        <div class="fixed bottom-8 w-[90%] max-w-xs left-[50%] translate-x-[-50%]">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            class="w-full rounded-2xl text-lg mb-4 bg-gradient-to-t py-4 from-amber-600 to-amber-500 border border-amber-500 active:scale-95 transition-all"
          >
            Zur Übersicht
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("simple-counter-user");
              window.location.href = "/";
            }}
            class="w-full rounded-2xl text-lg bg-gradient-to-t py-4 from-zinc-800 to-zinc-700 border border-zinc-700 active:scale-95 transition-all"
          >
            Ausloggen
          </button>
        </div>
      </div>
    </main>
  );
}
