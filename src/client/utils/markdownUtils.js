export const wrapTextIntoMarkdownCodeBlock = (str, language) => {
  return `\`\`\`${language}\n${str}\n\`\`\``;
};
