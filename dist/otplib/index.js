/**
 * otplib
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var hotp = _interopDefault(require('./hotp'));

var totp = _interopDefault(require('./totp'));

var authenticator = _interopDefault(require('./authenticator'));

var crypto = _interopDefault(require('crypto'));

authenticator.defaultOptions = {
  crypto
};
hotp.defaultOptions = {
  crypto
};
totp.defaultOptions = {
  crypto
};
exports.hotp = hotp;
exports.totp = totp;
exports.authenticator = authenticator;