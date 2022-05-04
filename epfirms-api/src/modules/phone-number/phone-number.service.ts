import { Service } from 'typedi';
import { Database } from '@src/core/Database';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const typea = require('google-libphonenumber').PhoneNumberType;

@Service()
export class PhoneNumberService {

  constructor() {}

  public async parse(phone: string): Promise<any> {
    const number = phoneUtil.parseAndKeepRawInput(phone, 'US');

    return Promise.resolve(number);
  }

  public async isValidNumber(number): Promise<any> {
    const isValid = phoneUtil.isValidNumber(number);

    return Promise.resolve(isValid);
  }

  public async getType(number): Promise<any> {
    const type = phoneUtil.getNumberType(number);
    const typeName = Object.keys(typea).find(key => typea[key] === type);

    return Promise.resolve(typeName);
  }

  public async isUniqueMobileNumber(phone: string): Promise<boolean> {
    const { user } = Database.models;
    const count = await user.count({where: {cell_phone: phone}});

    return count < 1;
  }
}
