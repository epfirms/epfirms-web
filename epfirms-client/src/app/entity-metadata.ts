import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Matter } from './_models/matter';
import { Staff } from './_models/staff';
import { LegalArea } from './_models/legal-area';
import {Document} from './_models/document';
import { Client } from './_models/client';

const entityMetadata: EntityMetadataMap = {
  Matter: {
    filterFn: matterFilter
  },
  Client: {
    filterFn: clientFilter
  },
  Staff: {
    filterFn: roleFilter
  },
  Firm: {},
  Document: {
    filterFn: documentFilter,
  },
  LegalArea: {}
};

export function roleFilter(entities: Staff[], search: string) {
  return entities.filter(e => e.firms[0].firm_employee[search]);
}

export function matterFilter(entities: Matter[], search: {matter_type: string; status: string; attorney_id?: number; client_id?: number; searchTerm?: string}) {
  let searchFields = Object.getOwnPropertyNames(search).filter(field => field !== 'searchTerm');

  return entities.filter(e => {
    if (search.searchTerm && search.searchTerm.length) {
      return searchFields.every(field => e[field] === search[field]) && JSON.stringify(e).toUpperCase().includes(search.searchTerm.toString().toUpperCase())
    }

    return searchFields.every(field => e[field] === search[field]);
  });
}

export function clientFilter(entities: Client[], search: {searchTerm?: string}) {
  return entities.filter(e => {
    return JSON.stringify(e).toUpperCase().includes(search.searchTerm.toString().toUpperCase())
  });
}

export function documentFilter(entities: Document[], search: number){
  return entities.filter(e => e.user_id === search)
}

const pluralNames = { Staff: 'Staff' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
