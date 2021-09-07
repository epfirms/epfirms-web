import { Database } from '@src/core/Database';
const bcrypt = require('bcrypt');

export interface Document {
  id: number;
  user_id: number;
  doc_type: string;
  doc_key: string;
  aws_link: string;
  share_with: string;
  email_to_appointees: boolean;
  client_upload: boolean;
}


export class DocumentService {
  public static async create(documentDetails): Promise<any>{
    try {
      const document = await Database.models.document.create(documentDetails);

      return Promise.resolve(document);
    } catch (err) {
      console.error(err);
    }

  }

  public static async getAllFirmDocuments(firmId): Promise<any> {
    try {
      const documents = await Database.models.document.findAll({where: {firm_id: firmId}})
      return Promise.resolve(documents);
    } catch (err) {
      console.error(err);
    }
  }

  public static async getDocumentById(docId): Promise<any> {
    try {
      const document = await Database.models.document.findOne({where: {id: docId}});
      return Promise.resolve(document);
    } catch (err) {
      console.error(err);
    }
  }

  public static async delete(docId): Promise<any> {
    try {
      const destroyedDocument = await Database.models.document.destroy({where: {id: docId}});
      return Promise.resolve(destroyedDocument);
    } catch (err) {
      console.error(err);
    }
  }

  public static async update(docId, data): Promise<any> {
    try {
      const updatedDocument = await Database.models.document.update(data, {where:{id: docId}})
      return Promise.resolve(updatedDocument);
    }
    catch(err) {
      console.error(err);
    }
  }
}
