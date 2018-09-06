import createWsProvider from '@polkadot/api-provider/ws'
import createApi from '@polkadot/api-rx'
// import defaults from '@polkadot/api-rx/defaults'
import store from '../store/index'

export default {
  initialise: () => {
    // const url = (process.env.WS_URL === null) || (process.env.WS_URL === '') ? defaults.WS_URL : process.env.WS_URL
    store.commit('mutateApi', createApi(createWsProvider('wss://poc-2.polkadot.io:9944', true)))
    const api = store.state.api
    const isConnected = setInterval(() => {
      if (store.state.api !== undefined) {
        console.info('connected')
        api.isConnected()
        clearInterval(isConnected)
      } else {
        console.info('trying to reach the api')
      }
    }, 1e3)
  }
}
