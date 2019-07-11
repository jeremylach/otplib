/**
 * otplib
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && _typeof(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var hotp = _interopDefault(require("./hotp"));

var totp = _interopDefault(require("./totp"));

var authenticator = _interopDefault(require("./authenticator"));

var crypto = _interopDefault(require('crypto'));

authenticator.defaultOptions = {
  crypto: crypto
};
hotp.defaultOptions = {
  crypto: crypto
};
totp.defaultOptions = {
  crypto: crypto
};
exports.hotp = hotp;
exports.totp = totp;
exports.authenticator = authenticator;