import _ from 'underscore';

import appConfig from '../../../appConfig.js';

function Utils() {
  let unionFn = appTags => {
      return newTags => {
        return _.union(appTags, newTags);
      };
    };

  this.metaTagUnion = unionFn(appConfig.metaTags);

}

export default new Utils();
