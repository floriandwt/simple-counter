import Preset from "../config/counter.preset.json";

export default function Edit() {
  return (
    <main class="w-screen h-screen font-sans bg-black text-white">
      <div class="w-[90%] mx-auto py-20 h-screen flex flex-col justify-between">
        <div>
          <h1 class="text-center text-3xl mb-16">
            {localStorage.getItem("simple-counter-user")}
          </h1>
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
