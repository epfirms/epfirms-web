import { Database } from '@src/core/Database';
import { Service } from 'typedi';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
const {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_ONLY_API_KEY
} = require('@configs/vars');

@Service()
export class ClientSearchService {
  private algoliaClient: SearchClient;
  private algoliaIndex: SearchIndex;

  constructor() {
    this.algoliaClient = this.initSearchClient();
    this.algoliaIndex = this.initIndex();
  }
  public async indexObjects(): Promise<any> {
    try {
      const { user, client, firm, matter } = Database.models;

      const getClients = await user.findAll({
        include: [
          {
            model: firm,
            required: true,
            through: {
              model: client,
              attributes: ['active', 'created_at'],
              as: 'client_firm'
            }
          },
          {
            model: matter,
            as: 'client',
            required: false,
            where: {
              deleted: false
            }
          }
        ]
      });

      const formattedClients = getClients.map((client) => {
        const clientData = client.dataValues;
        return {
          objectID: clientData.id,
          profile_image: clientData.profile_image,
          first_name: clientData.first_name,
          last_name: clientData.last_name,
          email: clientData.email,
          phone: clientData.phone,
          visible_by: [clientData.firms[0].id],
          matters: clientData.client,
          matters_count: clientData.client.length
        };
      });

      this.algoliaIndex
        .saveObjects(formattedClients)
        .wait()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return Promise.resolve(formattedClients);
    } catch (err) {
      console.error(err);
    }
  }

  public async generateClientSearchKey(firmId: number): Promise<any> {
    if (firmId) {
      const key = this.algoliaClient.generateSecuredApiKey(ALGOLIA_SEARCH_ONLY_API_KEY, {
        filters: `visible_by:${firmId}`
      });
      return Promise.resolve(key);
    } else {
      return Promise.reject('Invalid firm id');
    }
  }

  private initSearchClient(): SearchClient {
    return algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  }

  private initIndex(): SearchIndex {
    return this.algoliaClient.initIndex(ALGOLIA_INDEX_NAME);
  }
}
