export interface TemplateTask {
    id?: number;
    template_id?: number;
    user_id: number | null;
    name: string;
    no_of_days_from_start_date: number | null;
    user?: any;
    duration_minutes?: number | null;
    firm_role_id: number | null;
    firm_role?: any;
}