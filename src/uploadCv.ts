import busboy from 'busboy';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import NoFileUploaded from './errors/NoFileUploaded';

export default function uploadCv() {
  return (req: any, _: any, next: any) => {
    try {
      var bb = busboy({ headers: req.headers });
      let filereq = '';

      bb.on('file', function (name: any, file: any, info: any) {
        const { filename, encoding, mimeType } = info;
        if (!filename) return next(new NoFileUploaded('No file uploaded'));
        filereq = `${uuidv4()}-${Date.now()}-${filename}`;
        console.log(
          `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
          filename,
          encoding,
          mimeType
        );
        var saveTo = path.join(__dirname, '../uploads/', filereq);
        if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
          fs.mkdirSync(path.join(__dirname, '../uploads'));
        }

        file.pipe(fs.createWriteStream(saveTo));
      });

      bb.on('finish', function () {
        req.file = '/' + filereq;
        next();
      });

      bb.on('error', function (err) {
        console.log('Error: ' + err);
      });

      req.pipe(bb);
    } catch (error) {
      throw error;
    }
  }
}
