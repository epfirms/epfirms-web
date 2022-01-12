import { CaseTemplateCommunityController } from './case-template-community.controller';
import Container from 'typedi';

const caseTemplateCommunityController = Container.get(CaseTemplateCommunityController);

export { caseTemplateCommunityController };