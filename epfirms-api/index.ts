import 'reflect-metadata';
require('module-alias/register');
import Container from 'typedi';
import { Server } from '@src/core/Server';

const server = Container.get(Server)

export const epfserver = server.app;