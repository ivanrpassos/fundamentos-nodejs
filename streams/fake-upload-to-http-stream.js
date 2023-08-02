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

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneHundredStream(),
  duplex: 'half',
}).then((res) => {
  res.text().then((data) => {
    console.log(data);
  });
});
