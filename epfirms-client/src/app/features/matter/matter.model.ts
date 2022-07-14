export interface Matter {
  id: number;
  attorney_id: number;
  billing_setup: boolean;
  case_id: string;
  client_id: number;
  created_at: string;
  deleted: boolean;
  firm_id: number;
  iolta_balance: number | null;
  legal_area_id: number;
  matter_intake_id: number | null;
  matter_type: 'case' | 'lead';
  opposing_counsel_id: number | null;
  point_of_contact_id: number | null;
  spouse_id: number | null;
  status: 'active' | 'inactive';
  title: string;
  total_billed: number | null;
  total_paid: number | null;
  updated_at: string;

  next_task?: any;
  next_task_id: number | null;
  matter_tasks?: any[];
  client?: any;
  spouse?: any;
  legal_area?: any;
  point_of_contact?: any;
  attorney?: any;
  matter_intake?: any;
  matter_billing_setting?: any;
}
