module.exports = {
  extends: [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  plugins: [
    "prettier"
  ],
  rules: {
    "no-unused-expressions": ["error", {"allowTernary": true}],
    "comma-dangle": ["always-multiline"],
    "react/jsx-filename-extension": true,
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
      }
    ]
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
}
