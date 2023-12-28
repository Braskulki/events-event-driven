export default class BusinessError extends Error {
  isBusinessError = true;
  options?: { [key: string]: string | number | boolean };

  constructor(name: string, options?: { [key: string]: string | number | boolean }) {
    super(name);
    this.name = name;
    this.options = options;
  }
}
