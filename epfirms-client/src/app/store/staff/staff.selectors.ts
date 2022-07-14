import { Staff } from "@app/core/interfaces/staff";
import { EntitySelectorsFactory } from "@ngrx/data";

export const staffSelectors = new EntitySelectorsFactory().create<Staff>('Staff');