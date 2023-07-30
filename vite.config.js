import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      /* 
      Uncomment the following line to enable solid-devtools.
      For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
      */
      // devtools(),
      solidPlugin(),
    ],
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
    },
    define: {
      'process.env.YOUR_STRING_VARIABLE': JSON.stringify(env.YOUR_STRING_VARIABLE),
      'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE
    },
  };
});
