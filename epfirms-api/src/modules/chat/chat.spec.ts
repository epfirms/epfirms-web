import 'reflect-metadata';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Container from 'typedi';
import { ChatController } from './chat.controller';

chai.use(chaiAsPromised);

describe('ChatController', () => {
  it('helloworld', () => {
    const controller = Container.get(ChatController);
    // return controller.helloworld('', '').should.eventually.equal("hellworld");
  })
});