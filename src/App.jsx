import { createEffect, createSignal } from "solid-js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
import Login from "./Login";
import Edit from "./Edit";
import Start from "./Start";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

export default function App({ Page }) {
  const [path, setPath] = createSignal(window.location.pathname);
  const [config, setConfig] = createSignal(undefined);
  const [newVal, setNewVal] = createSignal(false);
  const configuration = ref(database, "configuration");

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
      <Show
        when={config() !== undefined}
        fallback={
          <div class="h-screen w-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        {path() === "/" && <Start Preset={config()} update={newVal} />}
        {path() === "/login" && <Login Preset={config()} />}
        {path() === "/edit" && <Edit Preset={config()} />}
      </Show>
    </main>
  );
}
