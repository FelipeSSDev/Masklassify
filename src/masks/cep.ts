import maskedValueProvider from '../providers/MaskedValueProvider';
import {Mask} from './models/Mask';
import {getDigits} from '../helpers';

class CEP implements Mask {
  validate = (cep = '') => cep.length === 9;

  raw = (cep = '') => getDigits(cep);

  value = (cep = '') => maskedValueProvider.execute(cep, '99999-999');
}

export default new CEP();
