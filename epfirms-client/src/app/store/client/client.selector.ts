import { Client } from '@app/_models/client';
import { EntityCollection, EntitySelectorsFactory } from '@ngrx/data';
import { createSelector } from '@ngrx/store';

export const selectClients = new EntitySelectorsFactory().create<Client>('Client');


export const selectClientById = (id: number) =>
  createSelector(selectClients.selectEntityMap, (entities) => entities[id]);
