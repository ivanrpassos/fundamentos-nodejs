import { Readable, Writable, Transform } from 'node:stream';

/**
 * Stream de leitura
 * Só conseguimos ler
 */
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

/**
 * Stream de transformação
 * Precisamos ler e escrever os dados
 * para outro lugar
 */
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

/**
 * Stream de escrita
 * Só conseguimos escrever
 */
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString() * 10));
    callback();
  }
}

new OneHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
