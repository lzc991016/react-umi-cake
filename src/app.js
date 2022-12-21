import './utils/init-leancloud-sdk'; //初始化leancloud的sdk
export const request = {
  requestInterceptors: [
    (url, options) => {
      options.url = 'https://rvzfe9go.lc-cn-n1-shared.com/1.1' + url;
      options.headers = {
        'X-LC-Id': 'RVzfE9GoqcoOz1ZXsdg6caMw-gzGzoHsz', //务必改为自己的Id
        'X-LC-Key': 'cK7RNbLAEb2EUbVLYNEy5l0v', //务必改为自己的Key
        'Content-Type': 'application/json',
        // 'Access- control - allow - origin': 'no-cors',
      };
      return options;
    },
  ],
  responseInterceptors: [
    async (response, options) => {
      let res = await response.json();
      let { results } = res;
      let data = results ? results : res;
      return { data };
    },
  ],
};
