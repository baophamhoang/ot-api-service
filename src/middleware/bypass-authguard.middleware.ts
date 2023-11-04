import { ConfigService } from '@/configs';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class BypassAuthguardMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      req.headers.authorization = this.configService.defaultBearer;
    }
    next();
  }
}
