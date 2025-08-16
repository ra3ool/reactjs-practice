import CryptoJS from 'crypto-js';

const cryptoSerializer = (secret: string) => ({
  serialize: (state: unknown): string => {
    const json = JSON.stringify(state);
    return CryptoJS.AES.encrypt(json, secret).toString(); // NOTE: no AEAD
  },
  deserialize: (cipherText: string): unknown => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secret);
    const json = bytes.toString(CryptoJS.enc.Utf8);
    return json ? JSON.parse(json) : {};
  },
});

export default cryptoSerializer;
