module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'standard'
    ],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'standard'
    ],
    rules: {
        'no-var': 'error',
        'prefer-const': 'error',
        'quote-props': ['error', 'as-needed'],
        indent: [
            'warn',
            4
        ],
        eqeqeq: 'off',
        'comma-dangle': [
            'off',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                functions: 'never',
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
}
