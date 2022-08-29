module.exports = {
    env: {
        browser: true,
        node: true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3'
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        'svelte3',
        "@typescript-eslint"
    ],
    "rules": {
    },
    settings: {
        'svelte3/typescript': require('typescript'), // pass the TypeScript package to the Svelte plugin
    },
}
