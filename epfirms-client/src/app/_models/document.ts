export class Document {
  id: number;
  user_id: number;
  matter_id: number;
  doc_name: string;
  doc_type: string;
  doc_key: string;
  aws_link: string;
  share_with: string;
  email_to_appointees: boolean;
  client_upload: boolean;
  firm_id: number;

  constructor(id: number, doc_name:string, user_id : number, firm_id: number, share_with: string){
    //create document instance
    this.id = id;
    this.doc_name = doc_name;
    this.user_id = user_id;
    this.share_with = share_with;
    this.firm_id = firm_id;
  }
}
