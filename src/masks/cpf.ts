import * as custom from './custom';
import {getDigits, makeCheckDigits} from '../helpers';
import {Mask} from './models/Mask';

class CPF extends Mask {
  private getCheckDigit = (digits: string) => {
    const numbers = digits.split('').map(number => {
      return parseInt(number, 10);
    });

    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((prev, curr) => prev + curr) % 11;

    return String(mod < 2 ? 0 : 11 - mod);
  };

  validate = (cpf = '') => {
    const stripped = getDigits(cpf);

    if (!stripped) {
      return false;
    }

    if (stripped.length !== 11) {
      return false;
    }

    const checkDigits = makeCheckDigits({
      digitsWithoutCheckDigits: stripped,
      length: 9,
      checker: this.getCheckDigit,
    });

    const checkDigitsInValidation = stripped.substring(-2);

    return checkDigits === checkDigitsInValidation;
  };

  raw = (cpf = '') => getDigits(cpf);

  value = (cpf = '') => custom.value(cpf, '999.999.999-99');
}

export default new CPF();
