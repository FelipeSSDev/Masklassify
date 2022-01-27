export interface IMaskedValueProvider {
  execute: (value: string, mask: string) => string;
}
