const TRANSLATION: Record<string, (s: string) => string | null> = {
  '*': val => val,
  '9': val => val.replace(/[^0-9]+/g, ''),
  A: val => val.replace(/[^a-zA-Z]+/g, ''),
  S: val => val.replace(/[^a-zA-Z0-9]+/g, ''),
};

const maskValue = (value: string, mask: string) => {
  let result = '';
  let maskCharIndex = 0;
  let valueCharIndex = 0;

  while (true) {
    if (mask.length === maskCharIndex) break;
    if (value.length === valueCharIndex) break;

    const currentMaskCharacter = mask[maskCharIndex];
    const currentValueCharacter = value[valueCharIndex];
    const translationHandler = TRANSLATION[currentMaskCharacter];

    if (currentValueCharacter === currentMaskCharacter) {
      result += currentMaskCharacter;

      valueCharIndex++;
      maskCharIndex++;

      continue;
    }

    if (!translationHandler) {
      result += currentMaskCharacter;

      maskCharIndex++;

      continue;
    }

    const translatedValue = translationHandler(currentValueCharacter || '');

    if (translatedValue === '') {
      valueCharIndex++;

      continue;
    }

    if (translatedValue !== null) {
      result += translatedValue;

      valueCharIndex++;
      maskCharIndex++;

      continue;
    }

    result += currentMaskCharacter;

    maskCharIndex++;
  }

  return result;
};

export const value = (value = '', mask = '') => {
  if (value === '') return value;

  const maskedValue = maskValue(value, mask);

  return maskedValue;
};
