import {cep} from '../../src/masks';

describe('Test CEP Mask', () => {
  const sut = cep;

  it('should receive CEP as a defined object', () => {
    expect(sut).toBeDefined();
  });

  it('should transform a CEP into a digits string with no formatting', () => {
    expect(sut.raw('12345-678')).toBe('12345678');
  });

  it('should validate a CEP with 9 digits', () => {
    expect(sut.validate('12345-678')).toBeTruthy();
  });

  it('should fail to validate a CEP', () => {
    expect(sut.validate('12345-67')).toBeFalsy();
  });

  it('should format a CEP', () => {
    expect(sut.value('12345678')).toBe('12345-678');
  });
});
