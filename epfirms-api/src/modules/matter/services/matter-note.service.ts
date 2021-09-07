import { Database } from '@src/core/Database';

export class MatterNoteService {

  /*
    create()
      Inputs:
        Note: A note object containing
          user_id: The id of the user making the comment.
          matter_id: The id of the matter (case, lead, etc), that the comment is related to.
          note_string: The actual content of the comment, in the form of a String.

      Outputs:
        Creates note in the database, and returns that note to the backend (eventually), so it can update the cache.
  */
  public static async create(note): Promise<any> {
    const { matter_note } = Database.models;
    
    const newNote = await matter_note.create(note);

    return Promise.resolve(newNote);
  }
}
