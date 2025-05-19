declare module 'assert' {
  function ok(value: any, message?: string): void;
  namespace ok {
    function strictEqual(actual: any, expected: any): void;
  }
  export = ok;
}
