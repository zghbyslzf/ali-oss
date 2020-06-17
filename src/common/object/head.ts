import { objectRequestParams } from '../utils/objectRequestParams';
/**
 * head
 * @param {String} name - object name
 * @param {Object} options
 * @param {{res}}
 */

export async function head(this: any, name: string, options: any = {}) {
  options.subres = Object.assign({}, options.subres);
  if (options.versionId) {
    options.subres.versionId = options.versionId;
  }
  const params = objectRequestParams('HEAD', name, this.options.bucket, options);
  params.successStatuses = [200, 304];

  const result = await this.request(params);

  const data: any = {
    meta: null,
    res: result.res,
    status: result.status
  };

  if (result.status === 200) {
    Object.keys(result.headers).forEach((k) => {
      if (k.indexOf('x-oss-meta-') === 0) {
        if (!data.meta) {
          data.meta = {};
        }
        data.meta[k.substring(11)] = result.headers[k];
      }
    });
  }
  return data;
};