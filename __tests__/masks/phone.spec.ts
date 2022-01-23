import {phone} from '../../src/masks';

describe('Test CNPJ Mask', () => {
  const sut = phone;

  it('should receive phone as a defined object', () => {
    expect(sut).toBeDefined();
  });

  it('should transform a phone number into a digits string with no formatting', () => {
    expect(sut.raw('(99)99999-9999')).toBe('99999999999');
    expect(sut.raw('(99)9999-9999')).toBe('9999999999');
  });

  it('should validate a phone number correctly', () => {
    expect(sut.raw('(99)99999-9999')).toBeTruthy();
    expect(sut.raw('(99)9999-9999')).toBeTruthy();
  });

  it('should fail to validate a phone number', () => {
    expect(sut.validate('(9)999-9999')).toBeFalsy();
    expect(sut.validate('(99)9999-99999')).toBeFalsy();
    expect(sut.validate('9999-9999')).toBeFalsy();
  });

  it('should format money (Reais)', () => {
    expect(sut.value('99999999999')).toBe('(99) 99999-9999');
    expect(sut.value('9999999999')).toBe('(99) 9999-9999');
  });
});
