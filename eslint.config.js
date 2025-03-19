import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },

    rules: {
      "no-undef": "error", // Habilita la regla para detectar variables no definidas
    },


  },
  
  pluginJs.configs.recommended,
];