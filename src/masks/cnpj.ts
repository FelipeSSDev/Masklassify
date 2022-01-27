import {getDigits, makeCheckDigits} from '../helpers';
import {Mask} from './models/Mask';
import {IMaskedValueProvider} from '../providers/interfaces/IMaskedValueProvider';

class CNPJ implements Mask {
  constructor(private readonly maskedValueProvider: IMaskedValueProvider) {}

  private getCheckDigit(digits: string) {
    let index = 2;

    const reverse: Array<number> = digits.split('').reduce((prev: number[], curr) => {
      return [parseInt(curr, 10)].concat(prev);
    }, []);

    const sum = reverse.reduce((total, currentValue) => {
      total += currentValue * index;
      index = index === 9 ? 2 : index + 1;
      return total;
    }, 0);

    const mod = sum % 11;

    return String(mod < 2 ? 0 : 11 - mod);
  }

  validate(cnpj = '') {
    const stripped = getDigits(cnpj);

    if (!stripped) {
      return false;
    }

    if (stripped.length !== 14) {
      return false;
    }

    const checkDigits = makeCheckDigits({
      digitsWithoutCheckDigits: stripped,
      length: 12,
      checker: this.getCheckDigit,
    });

    const checkDigitsInValidation = stripped.substring(-2);

    return checkDigits === checkDigitsInValidation;
  }

  raw(cnpj = '') {
    return getDigits(cnpj);
  }

  value(cnpj = '') {
    return this.maskedValueProvider.execute(cnpj, '99.999.999/9999-99');
  }
}

export default CNPJ;
