import { Show, createSignal, createEffect } from "solid-js";
import { database } from "./App";
import { ref, get } from "firebase/database";

export default function Login() {
  const configuration = ref(database, "configuration");
  const [config, setConfig] = createSignal(undefined);

  createEffect(async () => {
    const snapshot = await get(configuration);
    if (snapshot.exists()) {
      setConfig(snapshot.val());
    }
  });

  let password;
  let user;

  const checkPassword = () => {
    if (password.value === config().participants[user.selectedIndex].password) {
      window.location.href = "/edit";

      localStorage.setItem("simple-counter-user", user.value);
    } else {
      alert("Password incorrect");
    }
  };

  return (
    <main class="w-screen h-screen font-sans bg-black text-white">
      <Show when={config() !== undefined}>
        <div class="w-[90%] mx-auto py-20 h-screen flex flex-col justify-between">
          <div>
            <h1 class="text-center text-3xl mb-16">{config().title} Login</h1>
            <div class="mb-6">
              <label for="login-select" class="block text-lg mb-2">
                Einloggen als
              </label>
              <select
                ref={user}
                id="login-select"
                class="w-full rounded-lg bg-white py-4 text-black text-xl px-5"
              >
                <For each={config().participants}>
                  {(participant) => (
                    <option value={participant.name}>{participant.name}</option>
                  )}
                </For>
              </select>
            </div>
            <div>
              <label for="password" class="block text-lg mb-2">
                Password
              </label>
              <input
                ref={password}
                id="password"
                type="password"
                class="w-full rounded-lg bg-white py-4 text-black text-xl px-5"
              />
            </div>
          </div>
          <div class="fixed bottom-8 w-[90%] max-w-xs left-[50%] translate-x-[-50%]">
            <button
              onClick={() => {
                checkPassword();
              }}
              class="w-full rounded-2xl text-lg mb-4 bg-gradient-to-t py-4 from-amber-600 to-amber-500 border border-amber-500 active:scale-95 transition-all"
            >
              Weiter
            </button>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              class="w-full rounded-2xl text-lg bg-gradient-to-t py-4 from-zinc-800 to-zinc-700 border border-zinc-700 active:scale-95 transition-all"
            >
              Zurück
            </button>
          </div>
        </div>
      </Show>
    </main>
  );
}
