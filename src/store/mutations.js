export default {
  mutateActiveComponent: (state, activeComponent) => {
    state.activeComponent = activeComponent
  },
  mutateIsLoginView: (state, isLoginView) => {
    state.isLoginView = isLoginView
  },
  mutateNewUser: (state, newUser) => {
    state.newUser = newUser
  },
  mutateWalletsList: (state, walletsList) => {
    state.walletsList = walletsList
  },
  mutateSelectedWalletName: (state, selectedWalletName) => {
    state.selectedWalletName = selectedWalletName
  },
  mutateApi: (state, api) => {
    state.api = api
  },
  mutateAccounts: (state, accounts) => {
    state.accounts = accounts
  },
  mutateAddresses: (state, addresses) => {
    state.addresses = addresses
  }
}
