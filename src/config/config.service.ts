import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { EEnvironment } from '../enums';
import { IConfigParam, IEnvironmentParams } from './models';

dotenv.config();

@Injectable()
export class ConfigService {
  public config: IConfigParam;
  private readonly DEFAULT_PORT = 3000;

  constructor() {
    this._setup();
  }

  private _setup(): void {
    const ConfigSchema = Joi.object<IEnvironmentParams>({
      ENVIRONMENT: Joi.string()
        .valid(...Object.values(EEnvironment))
        .required(),
      PORT: Joi.number().default(this.DEFAULT_PORT),
    });

    const { value, error } = ConfigSchema.validate(process.env, {
      allowUnknown: true,
    });

    if (error) {
      throw error;
    }

    this.config = {
      environment: value.ENVIRONMENT,
      port: value.PORT,
    };
  }
}
