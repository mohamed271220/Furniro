import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// export default defineConfig(({mode}) => {
//   require('dotenv').config({ path: `./.env.${mode}` });
//   return {
//     /* ... */
//   }
// });