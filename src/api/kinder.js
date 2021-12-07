import { kinderInstance } from "./index.js";

// const api = apiInstance();
const kinder = kinderInstance();

function kinderList(params, success, fail) {
  kinder.get(``, { params: params }).then(success).catch(fail);
}
export { kinderList };
