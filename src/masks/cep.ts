import * as custom from './custom';
import {Mask} from './models/Mask';
import {getDigits} from '../helpers';

class CEP implements Mask {
  validate = (cep = '') => cep.length === 9;
  raw = (cep = '') => getDigits(cep);
  value = (cep = '') => custom.value(cep, '99999-999');
}

export default new CEP();
