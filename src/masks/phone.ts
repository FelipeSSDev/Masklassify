import {mergeSettings, getDigits} from '../helpers';
import {Mask} from './models/Mask';
import {IMaskedValueProvider} from '../providers/interfaces/IMaskedValueProvider';

type Settings = {
  ddd?: string;
  type?: 'BRL' | 'INTERNATIONAL';
};

class Phone implements Mask {
  private readonly DEFAULT_SETTINGS: Settings = {
    type: 'BRL',
    ddd: '(99) ',
  };
  private readonly PHONE_8_MASK = '9999-9999';
  private readonly PHONE_9_MASK = '99999-9999';
  private readonly PHONE_INTERNATIONAL = '+999 999 999 999';

  constructor(private readonly maskedValueProvider: IMaskedValueProvider) {}

  private getMask = (phone: string, settings?: Settings) => {
    const merged = mergeSettings(this.DEFAULT_SETTINGS, settings);

    if (merged.type === 'INTERNATIONAL') return this.PHONE_INTERNATIONAL;

    let mask = this.PHONE_8_MASK;
    const withDDD = merged.ddd && merged.ddd.length > 0;

    const use9DigitMask = (() => {
      if (withDDD) {
        const ddd = getDigits(merged.ddd);
        const remaining = phone.substring(ddd.length);
        return remaining.length >= 9;
      }
      return phone.length >= 9;
    })();

    if (use9DigitMask) {
      mask = this.PHONE_9_MASK;
    }

    if (withDDD) {
      mask = `${merged.ddd}${mask}`;
    }

    return mask;
  };

  raw(phone = '') {
    return getDigits(phone);
  }

  validate(phone = '', settings?: Settings) {
    const mask = this.getMask(getDigits(phone), settings);
    return phone.length === mask.length;
  }

  value(phone = '', settings?: Settings) {
    const cleaned = getDigits(phone);
    const mask = this.getMask(cleaned, settings);
    return this.maskedValueProvider.execute(cleaned, mask);
  }
}

export default Phone;
