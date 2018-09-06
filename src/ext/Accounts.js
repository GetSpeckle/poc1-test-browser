import keyring from '@polkadot/ui-keyring/index'
import storage from '@polkadot/storage'
import createStorageKey from '@polkadot/storage/key/index'
import u8aToBn from '@polkadot/util/u8a/toBn'

import Keygen from './Keygen'
import store from '../store/index'

const balanceMethod = storage.staking.public.freeBalanceOf
const nonceMethod = storage.system.public.accountIndexOf

export default class Accounts {
  /***
   * Save an account
   * @param name
   * @param password
   * @param seed
   * @returns {KeyringPair}
   */
  static saveAccount (seed, password, name) {
    try {
      console.log('* ', keyring.createAccount(Keygen.formatSeed(seed), password, name), seed, password, name)
      const createdAccount = keyring.createAccount(
        Keygen.formatSeed(seed), password, { name }
      )
      if (createdAccount) {
        keyring.saveAddress(createdAccount.address(), { name })

        const accounts = store.state.accounts
        accounts.push(createdAccount)

        const addresses = store.state.addresses
        addresses.push(createdAccount.address())

        // store.commit('mutateAddresses', addresses)
        store.commit('mutateAccounts', accounts)
      }
    } catch (e) {
      console.log(e)
    }
  }

  /***
   * List accounts
   * @returns {Array<KeyringAddress>}
   */
  static listAccounts () {
    return keyring.getAddresses()
  }

  /***
   * Get account details
   * @param address
   * @returns {KeyringAddress}
   */
  static getAccount (address) {
    return keyring.getAddress(address)
  }

  /***
   * Remove account from store
   * @param address
   */
  static forgetAccount (address) {
    keyring.forgetAccount(address)
  }

  /***
   * Get Account balance
   * @param account
   */
  static async accountBalance (account) {
    console.log(`acctBlanace addrs is ${account}`)
    const key = createStorageKey(balanceMethod)()
    console.log(`acctBlanace key is ${key}`)
    const balanceObs = store.state.api.state.getStorage(key)
    const balance = await balanceObs.toPromise()
    console.log('++ accountBalanceObs ', balanceObs)
    console.log('++ accountBalance ', balance)
    return u8aToBn(balance, true)
  }

  /***
   * Get Account txns count
   * @param account
   */
  static accountTxCount (account) {
    const key = createStorageKey(nonceMethod)
    console.log('++ accountTxCount ', store.state.api.state.getStorage(key))
    return store.state.api.state.getStorage(key(account))
  }
}
