import { For } from "solid-js";
import Preset from "../config/counter.preset.json";

export default function Start() {
  return (
    <main class="w-screen h-screen font-sans bg-black text-white">
      <div class="w-[90%] mx-auto py-20 h-screen flex flex-col justify-between">
        <div>
          <h1 class="text-center text-3xl mb-4">{Preset.title}</h1>
          <p class="text-center text-xl text-zinc-400">{Preset.description}</p>
          <div class="mt-16">
            <p class="text-lg mb-8">Teilnehmer:</p>
            <For each={Preset.participants}>
              {(participant) => (
                <div class="flex items-center justify-between mt-2 text-2xl mb-4">
                  <p>{participant.name}</p>
                  <p
                    class={
                      "flex items-center justify-center gap-3 " +
                      (Preset.unit.position === "suffix"
                        ? "flex-row-reverse"
                        : "")
                    }
                  >
                    <span>{Preset.unit.symbol}</span>
                    <span>{participant.score}</span>
                  </p>
                </div>
              )}
            </For>
          </div>
        </div>
        <div class="fixed bottom-8 w-[90%] max-w-xs left-[50%] translate-x-[-50%]">
          <button
            onClick={() => {
              if (!localStorage.getItem("simple-counter-user")) {
                window.location.href = "/login";
              } else {
                window.location.href = "/edit";
              }
            }}
            class="w-full rounded-2xl text-lg bg-gradient-to-t py-4 from-amber-600 to-amber-500 border border-amber-500 active:scale-95 transition-all"
          >
            Einloggen
          </button>
        </div>
      </div>
    </main>
  );
}
