import axios from "axios";
import _ from "lodash";

// const HOST = 'http://127.0.0.1:6500'
const HOST = "http://47.103.43.168:6500"; // 正式环境

function request(options) {
  const _options = _.cloneDeep(options);
  _options.url = HOST + _options.url;

  //打印请求LOG
  console.log("[REQUEST]==> ", _options);
  return axios(_options).then((res) => res.data);
}

export default request;
