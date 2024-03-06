/** @type {import("eslint").Linter.Config} */
const config = {
    rules: {
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                fixStyle: "separate-type-imports",
                prefer: "type-imports",
            },
        ],
        "@typescript-eslint/no-misused-promises": [
            2,
            {
                checksVoidReturn: { attributes: false },
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/return-await": ["error", "always"],
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/array-type": "off",
        "perfectionist/sort-objects": "off",
        "perfectionist/sort-maps": "off",
        "perfectionist/sort-classes": "off",
        "perfectionist/sort-imports": [
            "warn",
            {
                order: "asc",
                type: "line-length",
                "ignore-case": false,
                groups: [
                    "type",
                    ["builtin", "external"],
                    "internal-type",
                    "internal",
                    ["parent-type", "sibling-type", "index-type"],
                    ["parent", "sibling", "index"],
                    "object",
                    "unknown",
                ],
                "newlines-between": "always",
            },
        ],
        "perfectionist/sort-interfaces": [
            "warn",
            {
                order: "asc",
                type: "alphabetical",
                "ignore-case": false,
            },
        ],
        "perfectionist/sort-union-types": [
            "warn",
            {
                order: "asc",
                type: "alphabetical",
                "ignore-case": false,
            },
        ],
        "perfectionist/sort-named-imports": [
            "warn",
            {
                order: "asc",
                type: "line-length",
                "ignore-case": false,
            },
        ],
        "perfectionist/sort-object-types": [
            "warn",
            {
                order: "asc",
                type: "alphabetical",
                "ignore-case": false,
            },
        ],
        "perfectionist/sort-jsx-props": [
            "warn",
            {
                order: "asc",
                type: "line-length",
                "ignore-case": false,
            },
        ],
        "no-console": "warn",
    },
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:perfectionist/recommended-line-length",
    ],
    plugins: ["@typescript-eslint", "perfectionist"],
    parserOptions: {
        project: true,
    },
    parser: "@typescript-eslint/parser",
};

module.exports = config;
