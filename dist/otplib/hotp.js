/**
 * otplib-hotp
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

var otplibCore = require('./core');

class HOTP {
  constructor() {
    this._defaultOptions = {};
    this._options = this._defaultOptions;
  }

  getClass() {
    return HOTP;
  }

  set defaultOptions(opt = {}) {
    if (opt) {
      this._defaultOptions = Object.assign({}, this.defaultOptions, opt);
      this.options = opt;
    }
  }

  get defaultOptions() {
    return this._defaultOptions;
  }

  set options(opt = {}) {
    if (opt) {
      this._options = Object.assign({}, this._options, opt);
    }
  }

  get options() {
    return Object.assign({}, this._options);
  }

  get optionsAll() {
    return otplibCore.hotpOptions(this._options);
  }

  resetOptions() {
    this._options = this.defaultOptions;
    return this;
  }

  generate(secret, counter) {
    const opt = this.optionsAll;
    return otplibCore.hotpToken(secret || opt.secret, counter, opt);
  }

  check(token, secret, counter) {
    const opt = this.optionsAll;
    return otplibCore.hotpCheck(token, secret || opt.secret, counter, opt);
  }

  verify(opts) {
    if (typeof opts !== 'object' || opts == null) {
      return false;
    }

    return this.check(opts.token, opts.secret, opts.counter);
  }

}

HOTP.prototype.HOTP = HOTP;
var index = new HOTP();
module.exports = index;