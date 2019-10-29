module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  parser: "babel-eslint",
  plugins: ["react"],
  rules: {
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["action"] }],
    "react/prop-types": 0,
    "react/destructuring-assignment": 0
  }
};
