export class BehaviorSubject<T> {
  private _value: T;
  constructor(value: T) { this._value = value; }
  get value(): T { return this._value; }
  asObservable() { return this; }
  next(val: T): void { this._value = val; }
}
