import  Base64  from './base64';

class Storage {
  readonly localStorage: globalThis.Storage =
    window.localStorage ?? localStorage;

  private readonly base64 = new Base64();

  setStorage(key: string, value: string, isbase64 = false): void {
    const val = isbase64 ? this.base64.encode(value) : value;
    const k = isbase64 ? this.base64.encode(key) : key;
    this.localStorage.setItem(k, val);
  }

  getStorage(key: string, isbase64 = false): string {
    const k = isbase64 ? this.base64.encode(key) : key;
    const value = isbase64
      ? this.base64.decode(this.localStorage.getItem(k) ?? '')
      : this.localStorage.getItem(k);

    return value ?? '';
  }

  clear(): void {
    this.localStorage.clear();
  }

  removeItem(key: string, isbase64 = false): void {
    try {
      const k = isbase64 ? this.base64.decode(key) : key;
      this.localStorage.removeItem(k);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Storage;
