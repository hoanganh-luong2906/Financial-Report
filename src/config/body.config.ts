import { Injectable, NestMiddleware } from '@nestjs/common';
import { json } from 'body-parser';
import { IncomingMessage } from 'http';

@Injectable()
export class RawBodyMiddlewareMiddleware implements NestMiddleware {
  public use(req: IncomingMessage, res: Response, next: () => any): any {
    json({
      //json function not fired
      verify: (req, res, buffer) => {
        console.log(buffer);
        if (Buffer.isBuffer(buffer)) {
          const rawBody = Buffer.from(buffer);
          req['parsedRawBody'] = rawBody;
        }
        return true;
      },
    })(req, res as any, next);
  }
}
