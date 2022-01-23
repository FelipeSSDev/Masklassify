type makeCheckDigitsParams = {
  digitsWithoutCheckDigits: string;
  length: number;
  checker: (digits: string) => string;
};

export const makeCheckDigits = ({digitsWithoutCheckDigits, length, checker}: makeCheckDigitsParams) => {
  const digitsWithoutCheckDigit = digitsWithoutCheckDigits.substring(0, length);
  const digitsWithFirstCheckDigit = checker(digitsWithoutCheckDigit);
  const digitsWithSecondCheckDigit = checker(digitsWithFirstCheckDigit);

  return digitsWithSecondCheckDigit.substring(-2);
};
