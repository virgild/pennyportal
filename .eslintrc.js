module.exports = {
    "parser": "babel-eslint",
    "plugins": [
        "react", "mocha"
    ],
    "env": {
        "browser": true,
        "jquery": true,
        "es6": true,
        "mocha": true,
        "node": true,
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true // react
        },
    },
    "rules": {
        "max-len": [1, 180, 2, { ignoreComments: true }]
    },
    "extends": ["airbnb-base", "plugin:react/recommended"],
    "settings": {
        "react": {
            "version": "^16.5.2"
        },
    }
};
