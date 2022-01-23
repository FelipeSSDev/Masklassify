export abstract class Mask {
  public abstract validate(s: string): boolean;
  public abstract raw(s: string, options?: {}): string;
  public abstract value(s: string): string;
}
