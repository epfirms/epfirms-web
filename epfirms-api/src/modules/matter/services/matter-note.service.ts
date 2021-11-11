import { Database } from '@src/core/Database';

export class MatterNoteService {
  public static async get(matterId: number): Promise<any> {
    const { matter_note, user } = Database.models;

    const notes = await matter_note.findAll({
      where: { matter_id: matterId },
      include: [
        {
          model: user,
          attributes: ['id', 'first_name', 'last_name', 'profile_image']
        }
      ]
    });

    return Promise.resolve(notes);
  }
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
  public static async create(matterNote): Promise<any> {
    const { matter_note } = Database.models;

    const createdMatterNote = await matter_note.create(matterNote);

    return Promise.resolve(createdMatterNote);
  }

  public static async delete(noteId: number): Promise<any> {
    const { matter_note } = Database.models;

    await matter_note.destroy({ where: { id: noteId } });

    return Promise.resolve(true);
  }
}
