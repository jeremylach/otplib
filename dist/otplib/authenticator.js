/**
 * otplib-authenticator
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var totp = _interopDefault(require('./totp'));

var otplibUtils = require('./utils');

var otplibCore = require('./core');

var base32 = _interopDefault(require('thirty-two'));

function decodeKey(encodedKey) {
  return base32.decode(encodedKey).toString('hex');
}

function checkDelta(token, secret, options) {
  return otplibCore.totpCheckWithWindow(token, decodeKey(secret), options);
}

function check(token, secret, options) {
  const delta = checkDelta(token, secret, options);
  return Number.isInteger(delta);
}

function encodeKey(secret) {
  return base32.encode(secret).toString().replace(/=/g, '');
}

const data = '{service}:{user}?secret={secret}&issuer={service}';

function keyuri(user = 'user', service = 'service', secret = '') {
  const protocol = 'otpauth://totp/';
  const value = data.replace('{user}', encodeURIComponent(user)).replace('{secret}', secret).replace(/{service}/g, encodeURIComponent(service));
  return protocol + value;
}

function token(secret, options) {
  return otplibCore.totpToken(decodeKey(secret), options);
}

const TOTP = totp.TOTP;

class Authenticator extends TOTP {
  constructor() {
    super();
    this._defaultOptions = {
      encoding: 'hex',
      epoch: null,
      step: 30,
      window: 0
    };
    this._options = this._defaultOptions;
  }

  getClass() {
    return Authenticator;
  }

  encode(...args) {
    return encodeKey(...args);
  }

  decode(...args) {
    return decodeKey(...args);
  }

  keyuri(...args) {
    return keyuri(...args);
  }

  generateSecret(len = 20) {
    if (!len) {
      return '';
    }

    const secret = otplibUtils.secretKey(len, this.optionsAll);
    return encodeKey(secret);
  }

  generate(secret) {
    const opt = this.optionsAll;
    return token(secret || opt.secret, opt);
  }

  check(token$$1, secret) {
    const opt = this.optionsAll;
    return check(token$$1, secret || opt.secret, opt);
  }

  checkDelta(token$$1, secret) {
    const opt = this.optionsAll;
    return checkDelta(token$$1, secret || opt.secret, opt);
  }

}

Authenticator.prototype.Authenticator = Authenticator;
Authenticator.prototype.utils = {
  check,
  checkDelta,
  decodeKey,
  encodeKey,
  keyuri,
  token
};
var index = new Authenticator();
module.exports = index;