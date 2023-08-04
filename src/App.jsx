import { createEffect, createSignal } from "solid-js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const updateScore = async (name, score) => {
  try {
    const snapshot = await get(ref(database, "configuration"));
    const config = snapshot.val();

    const updatedParticipants = config.participants.map((participant) => {
      if (participant.name === name) {
        participant.score = score;
      }
      return participant;
    });

    await set(ref(database, "configuration"), {
      ...config,
      participants: updatedParticipants,
    });
  } catch (error) {
    console.error("Error updating score:", error);
  }
};


export default function App() {
  const [path, setPath] = createSignal(window.location.pathname);
  const [newVal, setNewVal] = createSignal(false);
  const configuration = ref(database, "configuration");
  const [config, setConfig] = createSignal(undefined);

  createEffect(() => {
    onValue(configuration, (snapshot) => {
      if (
        config() !== undefined &&
        config().participants !== snapshot.val().participants
      ) {
        setNewVal(true);
      }

      setConfig(snapshot.val());
    });
  });

  createEffect(() => {
    if (config() !== undefined) {
      document.title = config().title;
    }
  });

  return (
    <main class="w-screen h-screen font-sans bg-black text-white">
      <Show when={config() !== undefined}>
        <div class="w-[90%] mx-auto py-20 h-screen flex flex-col justify-between">
          <div>
            <h1 class="text-center text-3xl mb-4">{config().title}</h1>
            <p class="text-center text-xl text-zinc-400">
              {config().description}
            </p>
            <div class="mt-16">
              <p class="text-lg mb-8">Teilnehmer:</p>
              <For
                each={config().participants.sort((a, b) => b.score - a.score)}
              >
                {(participant) => (
                  <div class="flex items-center justify-between mt-2 text-2xl mb-4">
                    <p>{participant.name}</p>
                    <p
                      class={
                        "flex items-center justify-center gap-3 " +
                        (config().unit.position === "suffix"
                          ? "flex-row-reverse"
                          : "")
                      }
                    >
                      <span>{config().unit.symbol}</span>
                      <span>{participant.score}</span>
                    </p>
                  </div>
                )}
              </For>
            </div>
          </div>
          <div class="fixed bottom-8 w-[90%] max-w-xs left-[50%] translate-x-[-50%]">
            <Show when={newVal()}>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                class="w-full rounded-2xl text-lg mb-4 bg-gradient-to-t py-4 from-green-600 to-green-500 border border-green-500 active:scale-95 transition-all"
              >
                Neu laden
              </button>
            </Show>
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
      </Show>
    </main>
  );
}
