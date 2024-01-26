export default class NoFileUploaded extends Error {
  statusCode: number;

  constructor(message: any) {
    super(message);
    this.statusCode = 400;
  }
}