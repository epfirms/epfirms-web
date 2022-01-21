import { ReviewService } from '@src/modules/review/services/reviews.service';
import { Service } from 'typedi';
import { emailsService } from '@src/modules/emails/services/emails.service';
import { IdService } from '@src/modules/id/services/id.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { FirmService } from '@src/modules/firm/services/firm.service';
const { CLIENT_URL } = require('@configs/vars');

@Service()
export class ReviewController {
  constructor(
    private _emailService: emailsService,
    private _idService: IdService,
    private _reviewService: ReviewService,
    private _firmService: FirmService
  ) {}

  public async add(req, res) {
    const { email, matterId } = req.body;
    const { firm_id } = req.user.firm_access;

    const firmName = await this._firmService.getFirmName(firm_id);
    const subject = `A reminder to review ${firmName}`;
    const reviewId = await this._idService.generate();
    const reviewData = await this._reviewService.add(matterId, reviewId);
    const templateVars = {
      'v:firm_name': firmName,
      'v:url': `${CLIENT_URL}/review/${reviewId}`,
    };
    await this._emailService.sendFromTemplate(email, subject, 'firm-review', templateVars);
    // reviewsService.addReviewToDatabase(req.body.reviewComment,req.body.reviewRating, req.body.matter_id)
    res.status(StatusConstants.OK).send(reviewData);
  }

  public async update(req, res) {
    const { rating, comment } = req.body;
    const { uid } = req.params;

    const updated = await this._reviewService.update(uid, { rating, comment, status: 'complete' });
    res.status(StatusConstants.OK).send({ review: { status: 'complete' } });
  }

  public async get(req, res) {
    const { uid } = req.params;

    const review = await this._reviewService.get(uid);
    res.status(StatusConstants.OK).send({ review });
  }

  public async getByFirm(req, res) {
    const { firm_id } = req.user.firm_access;
    console.log(firm_id);
    const reviews = await this._reviewService.getByFirmId(firm_id);
    res.status(StatusConstants.OK).send({ reviews });
  }
}
