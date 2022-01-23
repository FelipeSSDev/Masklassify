import * as custom from './custom';
import {mergeSettings, getDigits} from '../helpers';
import {Mask} from './models/Mask';

type Settings = {
  ddd?: string;
  type?: 'BRL' | 'INTERNATIONAL';
};

const DEFAULT_SETTINGS: Settings = {
  type: 'BRL',
  ddd: '(99) ',
};

const PHONE_8_MASK = '9999-9999';
const PHONE_9_MASK = '99999-9999';
const PHONE_INTERNATIONAL = '+999 999 999 999';

class Phone implements Mask {
  private getMask = (phone: string, settings?: Settings) => {
    const merged = mergeSettings(DEFAULT_SETTINGS, settings);

    if (merged.type === 'INTERNATIONAL') return PHONE_INTERNATIONAL;

    let mask = PHONE_8_MASK;
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
      mask = PHONE_9_MASK;
    }

    if (withDDD) {
      mask = `${merged.ddd}${mask}`;
    }

    return mask;
  };

  raw = (phone = '') => getDigits(phone);

  value = (phone = '', settings?: Settings) => {
    const cleaned = getDigits(phone);
    const mask = this.getMask(cleaned, settings);
    return custom.value(cleaned, mask);
  };

  validate = (phone = '', settings?: Settings) => {
    const mask = this.getMask(getDigits(phone), settings);
    return phone.length === mask.length;
  };
}

export default new Phone();
