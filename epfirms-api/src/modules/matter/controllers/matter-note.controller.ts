import { Response } from 'express';
import { MatterNoteService } from '../services/matter-note.service';
import { MatterService } from '@modules/matter/services/matter.service';
import { StatusConstants } from '@src/constants/StatusConstants';
export class MatterNoteController {
  constructor(private _matterNoteService = MatterNoteService) {}

  public async getNotes(req: any, resp: Response): Promise<any> {
    try {
      const matterId = req.params.matter_id;

      const matterNotes = await this._matterNoteService.get(matterId);

      resp.status(StatusConstants.OK).send(matterNotes);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  /*
    createNote()
      Inputs:
        req.body: Must contain
          user_id: The id of the user making the comment.
          matter_id: The id of the matter (case, lead, etc), that the comment is related to.
          note_string: The actual content of the comment, in the form of a String.

      Outputs:
        Hands back the note to the front end, so it can update the current cache.
  */
  public async createNote(req: any, resp: Response): Promise<any> {
    try {
      const matterId = req.params.matter_id;

      const content = req.body.content;

      const userId = req.user.id;
      
      const note = {
        matter_id: matterId,
        content: content,
        user_id: userId
      };

      const newNote = await this._matterNoteService.create(note);

      resp.status(StatusConstants.OK).send(newNote);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async deleteNote(req: any, resp: Response): Promise<any> {
    try {
      const noteId = req.params.note_id;

      const newNote = await this._matterNoteService.delete(noteId);

      resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
