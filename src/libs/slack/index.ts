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

  public async getToken(code: string, origin: string) {
    const VALID_REDIRECT_URI = ['https://localhost:8081', this.config.redirectURI];

    const token = await this.client.openid.connect.token({
      client_id: this.config.clientID,
      client_secret: this.config.clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: VALID_REDIRECT_URI.includes(origin) ? origin : this.config.redirectURI,
      // redirect_uri: this.config.nodeEnv === 'local' ? 'https://localhost:8081' : 'https://dha-ot.vercel.app',
    });
    return token;
  }

  public async getUserInfo(accessToken: string) {
    const userInfo = await this.client.openid.connect.userInfo({ accessToken });
    return userInfo;
  }
}
