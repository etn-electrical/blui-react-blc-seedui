module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['@brightlayer-ui/eslint-config/tsx'],
    parserOptions: {
        project: ['./tsconfig.json'],
    },
    env: {
        browser: true,
    },
    // plugins: ['eslint-plugin-react', 'eslint-plugin-react-hooks', 'jest', 'jest-dom'],
    // rules: {
    //     'react-hooks/rules-of-hooks': 'error',
    //     'react-hooks/exhaustive-deps': 'off',
    //     'react/prop-types': 'off',
    // }
};
