import MaskedValueProvider from '../providers/MaskedValueProvider';
import CEP from './cep';
import CNPJ from './cnpj';
import CPF from './cpf';
import Money from './money';
import Phone from './phone';

const maskedValueProvider = new MaskedValueProvider();

const cep = new CEP(maskedValueProvider);
const cnpj = new CNPJ(maskedValueProvider);
const cpf = new CPF(maskedValueProvider);
const money = new Money();
const phone = new Phone(maskedValueProvider);

export {cep, cnpj, cpf, money, phone, maskedValueProvider};
export * as helpers from '../helpers';
