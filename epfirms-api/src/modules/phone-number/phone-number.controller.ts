import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { PhoneNumberService } from './phone-number.service';

@Service()
export class PhoneNumberController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  public async getPhoneNumber(req, res) {
    try {
      const numberString = req.params.number;
      const number = await this.phoneNumberService.parse(numberString);
      const valid = await this.phoneNumberService.isValidNumber(number);
      const type = await this.phoneNumberService.getType(number);
      res.status(StatusConstants.OK).send({ data: {
        valid,
        type,
        number
      } });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
}
