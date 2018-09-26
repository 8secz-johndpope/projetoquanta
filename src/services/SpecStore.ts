import { OpenAPIExternalDocumentation, OpenAPISpec } from '../types';

import { ContentItemModel, MenuBuilder } from './MenuBuilder';
import { ApiInfoModel } from './models/ApiInfo';
import { SecuritySchemesModel } from './models/SecuritySchemes';
import { OpenAPIParser } from './OpenAPIParser';
import { RedocNormalizedOptions } from './RedocNormalizedOptions';
/**
 * Store that containts all the specification related information in the form of tree
 */
export class SpecStore {
  parser: OpenAPIParser;

  info: ApiInfoModel;
  externalDocs?: OpenAPIExternalDocumentation;
  contentItems: ContentItemModel[];
  securitySchemes: SecuritySchemesModel;

  constructor(
    spec: OpenAPISpec,
    specUrl: string | undefined,
    postmanUrl: string | undefined,
    private options: RedocNormalizedOptions,
  ) {
    this.parser = new OpenAPIParser(spec, specUrl, postmanUrl, options);
    this.info = new ApiInfoModel(this.parser);
    this.externalDocs = this.parser.spec.externalDocs;
    this.contentItems = MenuBuilder.buildStructure(this.parser, this.options);
    this.securitySchemes = new SecuritySchemesModel(this.parser);
  }
}
