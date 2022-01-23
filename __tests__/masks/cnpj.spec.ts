import {cnpj} from '../../src/masks';

describe('Test CNPJ Mask', () => {
  const sut = cnpj;

  it('should receive CEP as a defined object', () => {
    expect(sut).toBeDefined();
  });

  it('should transform a CNPJ into a digits string with no formatting', () => {
    expect(sut.raw('11.444.777/0001-33')).toBe('11444777000133');
  });

  it('should validate a CNPJ with 14 digits', () => {
    expect(sut.validate('97.907.999/0001-99')).toBeTruthy();
  });

  it('should fail to validate a CNPJ', () => {
    expect(sut.validate('11.444.777/0001-3')).toBeFalsy();
    expect(sut.validate('11.444.777/0001-34')).toBeFalsy();
  });

  it('should format a CNPJ', () => {
    expect(sut.value('11444777000133')).toBe('11.444.777/0001-33');
  });
});
