import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { DocumentService } from '../services/document.service';

const passport = require('passport');

export class DocumentController {
  constructor() {}

  public async createDocument(req: Request, res: Response): Promise<any>{
    try {
      const createdDocument = await DocumentService.create(req.body);
      res.status(StatusConstants.CREATED).send(createdDocument);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async getUserDocuments(req , res: Response): Promise<any> {
    try {
      const userId = req.user.id;
      const userDocuments = await DocumentService.getDocumentsByUserId(userId);
      res.status(StatusConstants.OK).send(userDocuments);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async getAllFirmDocuments(req , res: Response): Promise<any> {
    try {
      const firmId = req.user.firm_access.firm_id;
      const firmDocuments = await DocumentService.getAllFirmDocuments(firmId);
      res.status(StatusConstants.OK).send(firmDocuments);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req, res: Response): Promise<any> {
    try {
      const docId = req.params.id;
      const doc = await DocumentService.getDocumentById(docId);
      const destroyed = await DocumentService.delete(docId);
      res.status(StatusConstants.OK).send(doc);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async update (req, res: Response): Promise<any> {
    try {
      const docId = req.params.id;
      const updatedDoc = await DocumentService.update(docId, req.body);
      res.status(StatusConstants.OK).send(updatedDoc);
    }catch(err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
