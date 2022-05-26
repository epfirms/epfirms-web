import { Service } from "typedi";
import * as dotenv from 'dotenv';
dotenv.config();

const isUndefined = (obj: any) : obj is undefined => typeof obj === 'undefined';

@Service()
export class ConfigService {
  constructor() {}

  get<T = any>(propertyPath: any, defaultValue?: T) {
    const processEnvValue = this._getFromProcessEnv(propertyPath);
    if (!isUndefined(processEnvValue)) {
      return processEnvValue;
    }

    return defaultValue as T;
  }

  private _getFromProcessEnv<T = any>(propertyPath: any): T {
    const processValue = process.env[propertyPath];
    return processValue as unknown as T;
  }
}