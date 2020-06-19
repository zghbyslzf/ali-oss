import { checkBucketName } from "../utils/checkBucketName";
import { obj2xml } from "../utils/obj2xml";

export async function putBucketReferer(this: any, name: string, allowEmpty: boolean, referers: any, options: any = {}) {
  checkBucketName(name);
  const params = this._bucketRequestParams('PUT', name, 'referer', options);
  const parseXMLObj = {
    RefererConfiguration: {
      AllowEmptyReferer: allowEmpty ? 'true' : 'false',
      RefererList: referers && referers.length > 0 ?
      {
        Referer: referers
      } :
      ''
    }
  }
  params.content = obj2xml(parseXMLObj);
  params.mime = 'xml';
  params.successStatuses = [200];
  const result = await this.request(params);
  return {
    res: result.res
  };
};