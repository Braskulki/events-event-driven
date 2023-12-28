

export default class UnauthorizedError extends Error {
  isUnauthorizedError = true;
  options?: { [key: string]: string | number | boolean };

  constructor(name: string, options?: { [key: string]: string | number | boolean }) {
    super(name);
    this.name = name;
    this.options = options;
  }
}
