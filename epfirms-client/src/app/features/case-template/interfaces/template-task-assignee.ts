export interface TemplateTaskAssignee {
    id: number | null;
    name: string;
    profile_image?: string;
};

export type AssigneeType = 'Role' | 'Staff';

export interface AssigneeGroup {
    type: AssigneeType;
    assignees: TemplateTaskAssignee[];
}