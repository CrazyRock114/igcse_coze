import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // Architectural guard rail: course copy belongs in content/*, never inline in components.
    // Catches CJK string literals that would make a component un-translatable.
    files: ['src/components/**/*.{ts,tsx}', 'src/sim/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "Literal[value=/[\\u4e00-\\u9fff]/]",
          message:
            'No Chinese literals in components. Put copy in src/content/** as a Bilingual value so it stays translatable.',
        },
      ],
    },
  }
)
