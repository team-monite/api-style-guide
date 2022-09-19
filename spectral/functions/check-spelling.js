const spellChecker = require('spellchecker');
const exceptions = ["iban", "bic"];

export default (input) => {

  const words = input.split('(\w+)');
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => spellChecker.isMisspelled(word));

  if (mistakes.length > 0) {
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
};
