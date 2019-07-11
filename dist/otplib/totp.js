/**
 * otplib-totp
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var otplibCore = require('./core');

var hotp = _interopDefault(require('./hotp'));

const HOTP = hotp.HOTP;

class TOTP extends HOTP {
  constructor() {
    super();
    this._defaultOptions = {
      epoch: null,
      step: 30,
      window: 0
    };
    this._options = this._defaultOptions;
  }

  getClass() {
    return TOTP;
  }

  get optionsAll() {
    return otplibCore.totpOptions(this._options);
  }

  generate(secret) {
    const opt = this.optionsAll;
    return otplibCore.totpToken(secret || opt.secret, opt);
  }

  check(token, secret) {
    const delta = this.checkDelta(token, secret);
    return Number.isInteger(delta);
  }

  checkDelta(token, secret) {
    const opt = this.optionsAll;
    return otplibCore.totpCheckWithWindow(token, secret || opt.secret, opt);
  }

  verify(opts) {
    if (typeof opts !== 'object' || opts == null) {
      return false;
    }

    return this.check(opts.token, opts.secret);
  }

  timeRemaining() {
    const opt = this.optionsAll;
    return otplibCore.totpTimeRemaining(opt.epoch, opt.step);
  }

  timeUsed() {
    const opt = this.optionsAll;
    return otplibCore.totpTimeUsed(opt.epoch, opt.step);
  }

}

TOTP.prototype.TOTP = TOTP;
var index = new TOTP();
module.exports = index;