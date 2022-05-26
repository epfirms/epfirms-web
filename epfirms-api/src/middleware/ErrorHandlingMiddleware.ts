import { Express } from "express";
import { Response, Request } from "express";
import { Service } from "typedi";
import { StatusConstants } from "../constants/StatusConstants";

@Service()
export class ErrorHandlingMiddleware {
  constructor() {}

  handle404Error() {
    return (req: Request, resp: Response) => {
      resp.status(StatusConstants.NOT_FOUND).send(StatusConstants.NOT_FOUND_MSG);
    };
  }
}
