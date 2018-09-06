export default {
  apiUrlBase: '/',
  paths: {
    apiRoot: () => '/api/root',
    etc: (id = '') => `/api/root/etc/${id}`
  }
}
