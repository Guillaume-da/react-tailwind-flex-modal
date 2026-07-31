import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ ignores: ['dist/**', 'node_modules/**', 'examples/**', 'coverage/**'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		plugins: { react, 'react-hooks': reactHooks },
		settings: { react: { version: 'detect' } },
		rules: {
			...react.configs.flat.recommended.rules,
			...reactHooks.configs.recommended.rules,
			// Props are typed by the TS interface; PropTypes would be redundant.
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			indent: ['error', 'tab'],
			quotes: ['error', 'single'],
			semi: ['error', 'never'],
			'linebreak-style': ['error', 'unix']
		}
	}
)
