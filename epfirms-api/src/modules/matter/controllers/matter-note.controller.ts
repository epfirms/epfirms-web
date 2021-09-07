import { Response } from 'express';
import { MatterNoteService } from '../services/matter-note.service';
import { MatterService } from '@modules/matter/services/matter.service';
import { StatusConstants } from '@src/constants/StatusConstants';
export class MatterNoteController {
  constructor(private _matterNoteService = MatterNoteService) {}


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
      const note = req.body;
      const user_id = req.user.id;

      note.user_id = user_id;
      const newNote = await this._matterNoteService.create(note);

      const matter = await MatterService.getOne(newNote.matter_id);

    resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }


}
