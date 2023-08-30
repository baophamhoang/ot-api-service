import { ConfigService } from '@/configs';
import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  private readonly client: WebClient = null;

  constructor(private readonly config: ConfigService) {
    if (!this.client) {
      this.client = new WebClient();
    }
  }

  async getToken(code: string) {
    const token = await this.client.openid.connect.token({
      client_id: this.config.clientID,
      client_secret: this.config.clientSecret,
      grant_type: 'authorization_code',
      code,
    });
    return token;
  }
}
