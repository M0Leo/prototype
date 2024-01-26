export {};
  
declare global {
  namespace Express {
    export interface Request {
      file: string;
    }
  }
}