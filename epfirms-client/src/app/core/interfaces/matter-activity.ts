export class MatterActivity {
  id: number;
  user_id: number;
  matter_id: number;
  feature: string;
  action: string;
  value?: string;
  staff_name?: string;
  created_at?: any;
  updated_at?: any;

  constructor(userId, matterId, feature, action, value?, staffName?){
    this.user_id = userId;
    this.matter_id = matterId;
    this.feature = feature;
    this.action = action;
    this.value = value;
    this.staff_name = staffName;
  }
}
