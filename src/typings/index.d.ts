declare namespace Express {
  interface Request {
    session: {
      idUser: string;
    };
  }
}
