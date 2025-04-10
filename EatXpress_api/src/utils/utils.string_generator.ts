export class StringGenerator {

    generateRandomString(length:number =8) {
        const Chars = '#@^!_|?/<>&$~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * Chars.length);
          randomString += Chars[randomIndex];
        }
      
        return randomString;
    }
}