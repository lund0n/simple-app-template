module.exports = {
  prompts: {
    name: {
      type: "string",
      required: true,
      label: "Project name"
    },
    scope: {
      type: "string",
      required: false,
      label: "NPM scope"
    },
    description: {
      type: "string",
      required: true,
      label: "Project description",
      default: "A React.js project"
    }
  },
  completeMessage:
    "{{#inPlace}}To get started:\n\n  npm install\n  npm start{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm start{{/inPlace}}"
};
