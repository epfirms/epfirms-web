import { LegalArea } from "@app/core/interfaces/legal-area";
import { EntitySelectorsFactory } from "@ngrx/data";

export const legalAreaSelectors = new EntitySelectorsFactory().create<LegalArea>('LegalArea');