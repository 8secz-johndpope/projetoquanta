import {OpenAPIContact, OpenAPIInfo, OpenAPILicense} from '../../types';
import {IS_BROWSER} from '../../utils/';
import {OpenAPIParser} from '../OpenAPIParser';
import * as yamljs from 'yamljs';
import axios from 'axios';

export class ApiInfoModel implements OpenAPIInfo {
  title: string;
  version: string;

  description: string;
  termsOfService?: string;
  contact?: OpenAPIContact;
  license?: OpenAPILicense;

  constructor(private parser: OpenAPIParser) {
    Object.assign(this, parser.spec.info);
    this.description = parser.spec.info.description || '';
    const firstHeadingLinePos = this.description.search(/^##?\s+/m);
    if (firstHeadingLinePos > -1) {
      this.description = this.description.substring(0, firstHeadingLinePos);
    }
  }

  async downloadPostmanLink(): Promise<string | undefined> {
    let url = this.parser.postmanUrl;
    if(!url){
      url = '';
    }
    return this.createDownloadFromUrl(url);
  }

  async createDownloadFromUrl(url: string, options?: any) : Promise<string | undefined> {
    const filename = url.substring(url.lastIndexOf('/')+1);

    if (url) {
      if(filename.endsWith('.json') || filename.endsWith('.yaml')){
        if (IS_BROWSER && window.Blob && window.URL && window.URL.createObjectURL) {
          try {
            const result = await axios.get(url);
            let data;

            if(typeof result.data === 'object'){
              data = JSON.stringify(result.data);
            }else{
              data = result.data;
            }

            const blob = new Blob([data], options);

            return window.URL.createObjectURL(blob);
          }catch (e) {
            console.log(e);
          }
        }
      }
    }
    return url;
  }

  async downloadLink(): Promise<string | undefined> {
    const url = this.parser.specUrl;
    if (url) {
      return await this.createDownloadFromUrl(url, { type: 'application/text'});
    }

    if (IS_BROWSER && window.Blob && window.URL && window.URL.createObjectURL) {
      const blob = new Blob([yamljs.stringify(this.parser.spec, undefined, 2)], {
        type: 'application/text',
      });
      return window.URL.createObjectURL(blob);
    }
  }

  get downloadPostmanFileName(): string | undefined {
    const url = this.parser.postmanUrl;
    if(url){
      return url.substring(url.lastIndexOf('/')+1)
    }
    return undefined;
  }

  get downloadFileName(): string | undefined {
    const url = this.parser.specUrl;
    if (!url) {
      return 'swagger.json';
    }

    if(url){
      return url.substring(url.lastIndexOf('/')+1)
    }
  }
}
