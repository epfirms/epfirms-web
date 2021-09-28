import { Matter } from '@app/_models/matter';
import { EntityCollection, EntitySelectorsFactory } from '@ngrx/data';
import { createSelector } from '@ngrx/store';
import { selectClientById, selectClients } from '../client/client.selector';

const selectMatters = new EntitySelectorsFactory().create<Matter>('Matter');


export const selectPopulatedMatters = createSelector(selectMatters.selectFilteredEntities, selectClients.selectEntityMap, (matters, clients) => matters.map(m => ({
  ...m,
  client: clients[m.client_id]
})));