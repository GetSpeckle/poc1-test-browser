import addressEncode from '@polkadot/util-keyring/address/encode'
import isHex from '@polkadot/util/is/hex'
import stringShorten from '@polkadot/util/string/shorten'
import hexToU8a from '@polkadot/util/hex/toU8a'
import keypairFromSeed from '@polkadot/util-crypto/nacl/keypair/fromSeed'
import u8aFromString from '@polkadot/util/u8a/fromString'
import u8aToString from '@polkadot/util/u8a/toString'
import randomBytes from '@polkadot/util-crypto/random/asU8a'
import u8aToHex from '@polkadot/util/u8a/toHex'

export default class Keygen {
  /***
   * Generates random seed string
   * @returns {string}
   */
  static randomSeed () {
    return u8aToHex(randomBytes())
  }

  /***
   * Formats seed string
   * @param seed
   * @returns {Uint8Array}
   */
  static formatSeed (seed) {
    return this.isSeedValid(seed)
      ? hexToU8a(seed)
      : u8aFromString(seed.padEnd(32, ' '))
  }

  /***
   * Convert uint8array to string
   * @param u8array
   * @returns {string | *}
   */
  static toString (u8array) {
    return u8aToString(u8array)
  }

  /****
   * Convert string to uint8array
   * @param str
   * @returns {Uint8Array | *}
   */
  static fromString (str) {
    return u8aFromString(str)
  }

  /***
   * Generates public key from provided seed string
   * @param seed
   * @returns {string}
   */
  static addressFromSeed (seed) {
    return this.isSeedValid(seed)
      ? addressEncode(
        keypairFromSeed(
          this.formatSeed(seed)
        ).publicKey
      ) : null
  }

  /***
   * Determine if the seed is valid
   * @param seed
   * @returns {boolean}
   */
  static isSeedValid (seed) {
    return isHex(seed)
      ? seed.length === 66
      : seed.length <= 32
  }

  /***
   * Determine if the password is valid
   * @param password
   * @returns {boolean}
   */
  static isPasswordValid (password) {
    return password.length > 0 && password.length <= 32
  }

  /***
   * Returns a shortened version of string with ellipses
   * @param str
   * @param len
   * @returns {string}
   */
  static shortenStr (str, len) {
    return stringShorten(str, len)
  }
}
