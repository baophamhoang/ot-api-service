import { Inject, Injectable } from '@nestjs/common';
import { ApiConfig, apiConfig } from './api';
import { AppStateConfig, NodeEnv, appStateConfig } from './app-state';
import { SlackConfig, slackConfig } from './slack';
import { ServiceConfig, serviceConfig } from './service';

@Injectable()
export class ConfigService {
  public readonly clientID: string;
  public readonly clientSecret: string;
  public readonly issuer: string;
  public readonly redirectURI: string;

  public readonly port: number;
  public readonly nodeEnv: NodeEnv;

  public readonly prefix: string;
  public readonly version: string;

  public readonly scrapingSvc: string;

  constructor(
    @Inject(slackConfig.KEY) slackConfiguration: SlackConfig,
    @Inject(appStateConfig.KEY) appStateConfiguration: AppStateConfig,
    @Inject(apiConfig.KEY) apiConfiguration: ApiConfig,
    @Inject(serviceConfig.KEY) serviceConfiguration: ServiceConfig,
  ) {
    this.clientID = slackConfiguration.clientID;
    this.clientSecret = slackConfiguration.clientSecret;
    this.issuer = slackConfiguration.issuer;
    this.redirectURI = slackConfiguration.redirectURI;

    this.port = appStateConfiguration.port;
    this.nodeEnv = appStateConfiguration.nodeEnv;

    this.prefix = apiConfiguration.prefix;
    this.version = apiConfiguration.version;

    this.scrapingSvc = serviceConfiguration.scrapingSvc;
  }
}
