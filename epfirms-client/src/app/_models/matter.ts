import { LegalArea } from "./legal-area";
import { MatterTask } from "./matter-task";
import { Review } from "./review";
import { MatterNote } from "./matter-note";

export class Matter {
    id: number;
    case_id: string;
    firm_id: number;
    status: string;
    legal_area_id: number;
    legal_area: LegalArea;
    matter_type: string;
    client: any;
    client_id: number;
    attorney: any;
    attorney_id: number;
    opposing_counsel?: any;
    point_of_contact_id?: number;
    point_of_contact?: any;
    spouse?: any;
    spouse_id?: number;
    matter_tasks?: MatterTask[];
    matter_intake_id?: number;
    matter_intake?: any;
    reviews?: Review[];
    matter_notes?: MatterNote[];
    deleted?: boolean;
    created_at?: string;
  }
  