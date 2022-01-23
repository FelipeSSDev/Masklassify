import {cpf} from '../../src/masks';

describe('Test CNPJ Mask', () => {
  const sut = cpf;

  it('should receive CPF as a defined object', () => {
    expect(sut).toBeDefined();
  });

  it('should transform a CPF into a digits string with no formatting', () => {
    expect(sut.raw('237.346.680-50')).toBe('23734668050');
  });

  it('should validate a CNPJ with 14 digits', () => {
    expect(sut.validate('237.346.680-50')).toBeTruthy();
  });

  it('should fail to validate a CNPJ', () => {
    expect(sut.validate('237.346.680-5')).toBeFalsy();
    expect(sut.validate('237.346.680-51')).toBeFalsy();
  });

  it('should format a CNPJ', () => {
    expect(sut.value('23734668050')).toBe('237.346.680-50');
  });
});
