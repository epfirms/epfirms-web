import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class ReviewService {
  constructor() {}
  public async add(matterId: number, uid: string) {
    const { review } = Database.models;
    const reviewInstance = await review.create({
      matter_id: matterId,
      uid,
    });

    return Promise.resolve(reviewInstance);
  }

  public async get(uid: string): Promise<any> {
    const { review, matter, firm } = Database.models;
    const reviewInstance = await review.findOne({
      where: { uid },
      include: {
        model: matter,
        attributes: ['id', 'firm_id'],
        include: {
          model: firm,
          attributes: ['id', 'name', 'google_review_url'],
        },
      },
    });

    return Promise.resolve(reviewInstance);
  }

  public async update(uid: string, values: any) {
    const { review } = Database.models;
    const reviewInstance = await review.update(values, {
      where: {
        uid,
        status: 'sent',
      },
    });

    return Promise.resolve(reviewInstance);
  }
}
