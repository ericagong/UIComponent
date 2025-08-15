import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    prettier,
    {
        files: ['src/**/*.{ts,tsx,js,jsx}'],
        ignores: ['**/*', '!src/**/*'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 'latest',
                project: './tsconfig.json',
            },
            globals: {
                React: true,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            import: importPlugin,
            react,
            'react-hooks': reactHooks,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // 코드 품질
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            'prefer-const': 'warn',
            'no-param-reassign': ['warn', { props: true, ignorePropertyModificationsFor: ['ref'] }],
            'no-else-return': 'warn',
            'default-case': 'warn',
            'object-curly-spacing': ['warn', 'always'],
            'react/jsx-boolean-value': ['warn', 'never'],
            'react/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }],

            // import 정렬
            'import/order': 'off',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',

            // React
            'react/jsx-key': 'error',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // 타입스크립트
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        },
    },
]
