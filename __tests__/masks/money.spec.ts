import {money} from '../../src/masks';

describe('Test CNPJ Mask', () => {
  const sut = money;

  it('should receive money as a defined object', () => {
    expect(sut).toBeDefined();
  });

  it('should transform money into a digits string with no formatting', () => {
    expect(sut.raw('R$50,00')).toBe('50.00');
  });

  it('should validate money (Reais) correctly', () => {
    expect(sut.validate('R$50,00')).toBeTruthy();
  });

  it('should fail to validate money (Reais)', () => {
    expect(sut.validate('50.00')).toBeFalsy();
  });

  it('should format money (Reais)', () => {
    expect(sut.value('5000')).toBe('R$ 50,00');
  });
});
