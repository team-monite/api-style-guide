const spellChecker = require('spellchecker');
const exceptions = ["bic","datetime","gt","gte","icontains","iban","idempotency","isnull","lt","lte","md5","mimetype","oid","userpic"];

const codeStyleRegex = /[_]/        // snake_case

export default (input) => {

  const words = input.split(codeStyleRegex);
  const mistakes = words
    .filter((word) => !exceptions.includes(word))
    .filter((word) => spellChecker.isMisspelled(word));

  if (mistakes.length > 0) {
    return [{
      message: `Spelling mistakes found: ${mistakes.join(', ')}`,
    }];
  }
};
