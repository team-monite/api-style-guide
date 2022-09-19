const spellChecker = require('spellchecker');
const exceptions = ["Jinja2","asc","bic","iban"];

const separatorsRegex = /\s/     // any whitespace

export default (input) => {

  const words = input.split(separatorsRegex);
  words.forEach(function(part, index, theArray) {
    theArray[index] = part.replace(/`/g, '');
  });
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => spellChecker.isMisspelled(word));

  if (mistakes.length > 0) {
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
};
