import { Readable } from 'node:stream';

class OneHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buff = Buffer.from(String(i));

        this.push(buff);
      }
    });
  }
}

new OneHundredStream().pipe(process.stdout);
