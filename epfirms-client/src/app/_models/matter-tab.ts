import { Matter } from "./matter";

export class MatterTab {
    id: number;
    subtabs: string[] = ['overview', 'tasks', 'activity', 'notes', 'documents', 'intake'];
    selectedSubtab: string;
    data: Matter;
}