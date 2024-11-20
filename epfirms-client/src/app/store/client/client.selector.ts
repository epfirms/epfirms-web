import { Client } from '@app/core/interfaces/client';
import { EntitySelectorsFactory } from '@ngrx/data';

export const clientSelectors = new EntitySelectorsFactory().create<Client>('Client');