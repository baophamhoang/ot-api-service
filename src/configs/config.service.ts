import { Inject, Injectable } from '@nestjs/common';
import { SlackConfig, slackConfig } from './slack';
import { AppStateConfig, NodeEnv, appStateConfig } from './app-state';

@Injectable()
export class ConfigService {
  public readonly clientID: string;
  public readonly clientSecret: string;
  public readonly issuer: string;

  public readonly port: number;
  public readonly nodeEnv: NodeEnv;

  constructor(@Inject(slackConfig.KEY) slackConfiguration: SlackConfig, @Inject(appStateConfig.KEY) appStateConfiguration: AppStateConfig) {
    this.clientID = slackConfiguration.clientID;
    this.clientSecret = slackConfiguration.clientSecret;
    this.issuer = slackConfiguration.issuer;

    this.port = appStateConfiguration.port;
    this.nodeEnv = appStateConfiguration.nodeEnv;
  }
}
