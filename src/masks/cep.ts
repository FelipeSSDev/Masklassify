import {Mask} from './models/Mask';
import {getDigits} from '../helpers';
import {IMaskedValueProvider} from '../providers/interfaces/IMaskedValueProvider';

class CEP implements Mask {
  constructor(private readonly maskedValueProvider: IMaskedValueProvider) {}

  validate(cep = '') {
    return cep.length === 9;
  }

  raw(cep = '') {
    return getDigits(cep);
  }

  value(cep = '') {
    return this.maskedValueProvider.execute(cep, '99999-999');
  }
}

export default CEP;
