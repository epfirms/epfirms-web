import Container from 'typedi';
import {AWSController} from './aws.controller';

const awsController = Container.get(AWSController);

export {awsController};
