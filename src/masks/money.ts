import {Mask} from './models/Mask';
import {mergeSettings, getDigits} from '../helpers';

type Settings = {
  precision?: number;
  floatingPoint?: string;
  separator?: string;
  suffixUnit?: string;
  unit?: string;
};

class Money implements Mask {
  private readonly DEFAULT_SETTINGS: Settings = {
    precision: 2,
    floatingPoint: ',',
    separator: '.',
    unit: 'R$ ',
    suffixUnit: '',
  };

  private sanitize = (value: string | number, precision: number) => {
    if (typeof value === 'number') {
      return value.toFixed(precision);
    }
    return value;
  };

  private insert = (s: string, index: number) => {
    if (index > 0) return s.substring(0, index) + '.' + s.substring(index, s.length);

    return '.' + s;
  };

  private toMoney = (s: string, settings: Required<Settings>) => {
    const number = s.toString().replace(/[\D]/g, ''),
      clearFloatingPoint = new RegExp('(\\' + settings.floatingPoint + ')$'),
      clearSeparator = new RegExp('^(0|\\' + settings.separator + ')');

    let money = number.substring(0, number.length - settings.precision),
      masked = money.substring(0, money.length % 3),
      cents = new Array(settings.precision + 1).join('0');

    money = money.substring(money.length % 3, money.length);

    for (let i = 0, len = money.length; i < len; i++) {
      if (i % 3 === 0) masked += settings.separator;
      masked += money[i];
    }

    masked = masked.replace(clearSeparator, '');
    masked = masked.length ? masked : '0';

    const beginCents = number.length - settings.precision,
      centsValue = number.substring(beginCents, settings.precision),
      centsLength = centsValue.length,
      centsSliced = settings.precision > centsLength ? settings.precision : centsLength;

    cents = (cents + centsValue).slice(-centsSliced);

    const output = settings.unit + masked + settings.floatingPoint + cents + settings.suffixUnit;

    return output.replace(clearFloatingPoint, '');
  };

  value = (value: string | number = '', settings?: Settings) => {
    const merged = mergeSettings(this.DEFAULT_SETTINGS, settings);
    const sanitized = this.sanitize(value, merged.precision);

    return this.toMoney(sanitized, merged);
  };

  raw = (value = '', settings?: Settings) => {
    const merged = mergeSettings(this.DEFAULT_SETTINGS, settings);
    const cleaned = getDigits(value);

    return this.insert(cleaned, cleaned.length - merged.precision);
  };

  validate = (value = '', settings?: Settings) => {
    const merged = mergeSettings(this.DEFAULT_SETTINGS, settings);
    return value.length > merged.precision + merged.unit.length + merged.suffixUnit.length;
  };
}

export default Money;
