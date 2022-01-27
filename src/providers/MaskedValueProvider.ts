import {IMaskedValueProvider} from './interfaces/IMaskedValueProvider';

class MaskedValueProvider implements IMaskedValueProvider {
  private readonly TRANSLATION: Record<string, (s: string) => string | null> = {
    '*': val => val,
    '9': val => val.replace(/[^0-9]+/g, ''),
    A: val => val.replace(/[^a-zA-Z]+/g, ''),
    S: val => val.replace(/[^a-zA-Z0-9]+/g, ''),
  };

  private makeMaskedValue(value: string, mask: string) {
    let result = '';
    let maskCharIndex = 0;
    let valueCharIndex = 0;

    while (true) {
      if (mask.length === maskCharIndex) break;
      if (value.length === valueCharIndex) break;

      const currentMaskCharacter = mask[maskCharIndex];
      const currentValueCharacter = value[valueCharIndex];
      const translationHandler = this.TRANSLATION[currentMaskCharacter];

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

      if (!translatedValue) {
        valueCharIndex++;

        continue;
      }

      result += translatedValue;

      valueCharIndex++;
      maskCharIndex++;
    }

    return result;
  }

  public execute(value: string, mask: string) {
    if (value === '') return value;

    return this.makeMaskedValue(value, mask);
  }
}

export default new MaskedValueProvider();
