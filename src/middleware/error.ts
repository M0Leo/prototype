import NoFileUploaded from '../errors/NoFileUploaded';

export default function errorHandler(err: any, _: any, res: any, __: any) {
  let statusCode = 500;
  if (err instanceof NoFileUploaded) {
    statusCode = err.statusCode;
  }

  if (statusCode === 400) {
    res.status(statusCode).render('error', { error: err.message });
  } else {
      res.status(statusCode).render('error', { error: err.message });
    }
}