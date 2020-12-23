import axios from "axios";
axios.defaults.baseURL = 'https://lpn.dev';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['content-type'] = 'application/x-www-form-urlencoded';
export default axios;
