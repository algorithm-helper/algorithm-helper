export const wrapTextIntoMarkdownCodeBlock = (str, language) => (
  `\`\`\`${language}\n${str}\n\`\`\``
);
