/**
 * otplib-core
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var otplibUtils = require('./utils');

function hotpCounter(counter) {
  const hexCounter = otplibUtils.intToHex(counter);
  return otplibUtils.leftPad(hexCounter, 16);
}

function hotpDigest(secret, counter, options) {
  if (!options.crypto || typeof options.crypto.createHmac !== 'function') {
    throw new Error('Expecting options.crypto to have a createHmac function');
  }

  if (typeof options.createHmacSecret !== 'function') {
    throw new Error('Expecting options.createHmacSecret to be a function');
  }

  if (typeof options.algorithm !== 'string') {
    throw new Error('Expecting options.algorithm to be a string');
  }

  const hmacSecret = options.createHmacSecret(secret, {
    algorithm: options.algorithm,
    encoding: options.encoding
  });
  const hexCounter = hotpCounter(counter);
  const cryptoHmac = options.crypto.createHmac(options.algorithm, hmacSecret);
  return cryptoHmac.update(Buffer.from(hexCounter, 'hex')).digest();
}

function hotpToken(secret, counter, options) {
  if (counter == null) {
    return '';
  }

  if (typeof options.digits !== 'number') {
    throw new Error('Expecting options.digits to be a number');
  }

  const digest = hotpDigest(secret, counter, options);
  const offset = digest[digest.length - 1] & 0xf;
  const binary = (digest[offset] & 0x7f) << 24 | (digest[offset + 1] & 0xff) << 16 | (digest[offset + 2] & 0xff) << 8 | digest[offset + 3] & 0xff;
  let token = binary % Math.pow(10, options.digits);
  token = otplibUtils.leftPad(token, options.digits);
  return token;
}

function hotpCheck(token, secret, counter, options) {
  const systemToken = hotpToken(secret, counter, options);

  if (systemToken.length < 1) {
    return false;
  }

  return otplibUtils.isSameToken(token, systemToken);
}

function hotpSecret(secret, options) {
  if (typeof options.encoding !== 'string') {
    throw new Error('Expecting options.encoding to be a string');
  }

  return Buffer.from(secret, options.encoding);
}

function hotpOptions(options = {}) {
  return Object.assign({
    algorithm: 'sha1',
    createHmacSecret: hotpSecret,
    crypto: null,
    digits: 6,
    encoding: 'ascii'
  }, options);
}

function totpCounter(epoch, step) {
  return Math.floor(epoch / step / 1000);
}

function totpToken(secret, options) {
  if (typeof options.epoch !== 'number') {
    throw new Error('Expecting options.epoch to be a number');
  }

  if (typeof options.step !== 'number') {
    throw new Error('Expecting options.step to be a number');
  }

  const counter = totpCounter(options.epoch, options.step);
  return hotpToken(secret, counter, options);
}

function totpCheck(token, secret, options) {
  const systemToken = totpToken(secret, options || {});

  if (systemToken.length < 1) {
    return false;
  }

  return otplibUtils.isSameToken(token, systemToken);
}

function createChecker(token, secret, opt) {
  const delta = opt.step * 1000;
  const epoch = opt.epoch;
  return (direction, start, bounds) => {
    for (let i = start; i <= bounds; i++) {
      opt.epoch = epoch + direction * i * delta;

      if (totpCheck(token, secret, opt)) {
        return i === 0 ? 0 : direction * i;
      }
    }

    return null;
  };
}

function getWindowBounds(opt) {
  const bounds = Array.isArray(opt.window) ? opt.window : [parseInt(opt.window, 10), parseInt(opt.window, 10)];

  if (!Number.isInteger(bounds[0]) || !Number.isInteger(bounds[1])) {
    throw new Error('Expecting options.window to be an integer or an array of integers');
  }

  return bounds;
}

function totpCheckWithWindow(token, secret, options) {
  let opt = Object.assign({}, options);
  const bounds = getWindowBounds(opt);
  const checker = createChecker(token, secret, opt);
  const backward = checker(-1, 0, bounds[0]);
  return backward !== null ? backward : checker(1, 1, bounds[1]);
}

function totpSecret(secret, options) {
  if (typeof options.algorithm !== 'string') {
    throw new Error('Expecting options.algorithm to be a string');
  }

  if (typeof options.encoding !== 'string') {
    throw new Error('Expecting options.encoding to be a string');
  }

  const encoded = Buffer.from(secret, options.encoding);
  const algorithm = options.algorithm.toLowerCase();

  switch (algorithm) {
    case 'sha1':
      return otplibUtils.padSecret(encoded, 20, options.encoding);

    case 'sha256':
      return otplibUtils.padSecret(encoded, 32, options.encoding);

    case 'sha512':
      return otplibUtils.padSecret(encoded, 64, options.encoding);

    default:
      throw new Error(`Unsupported algorithm ${algorithm}. Accepts: sha1, sha256, sha512`);
  }
}

const defaultOptions = {
  createHmacSecret: totpSecret,
  epoch: null,
  step: 30,
  window: 0
};

function totpOptions(options = {}) {
  let opt = Object.assign(hotpOptions(), defaultOptions, options);
  opt.epoch = typeof opt.epoch === 'number' ? opt.epoch * 1000 : Date.now();
  return opt;
}

function totpTimeUsed(epoch, step) {
  return Math.floor(epoch / 1000) % step;
}

function timeRemaining(epoch, step) {
  return step - totpTimeUsed(epoch, step);
}

exports.hotpCheck = hotpCheck;
exports.hotpCounter = hotpCounter;
exports.hotpDigest = hotpDigest;
exports.hotpOptions = hotpOptions;
exports.hotpSecret = hotpSecret;
exports.hotpToken = hotpToken;
exports.totpCheck = totpCheck;
exports.totpCheckWithWindow = totpCheckWithWindow;
exports.totpCounter = totpCounter;
exports.totpOptions = totpOptions;
exports.totpSecret = totpSecret;
exports.totpTimeRemaining = timeRemaining;
exports.totpTimeUsed = totpTimeUsed;
exports.totpToken = totpToken;