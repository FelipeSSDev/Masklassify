export interface Mask {
  validate(s: string): boolean;
  raw(s: string, options?: {}): string;
  value(s: string): string;
}
