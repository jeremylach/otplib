/**
 * otplib-authenticator
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _interopDefault(ex) {
  return ex && _typeof(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var totp = _interopDefault(require("./totp"));

var otplibUtils = require("./utils");

var otplibCore = require("./core");

var base32 = _interopDefault(require('thirty-two'));

function decodeKey(encodedKey) {
  return base32.decode(encodedKey).toString('hex');
}

function _checkDelta(token, secret, options) {
  return otplibCore.totpCheckWithWindow(token, decodeKey(secret), options);
}

function _check(token, secret, options) {
  var delta = _checkDelta(token, secret, options);

  return Number.isInteger(delta);
}

function encodeKey(secret) {
  return base32.encode(secret).toString().replace(/=/g, '');
}

var data = '{service}:{user}?secret={secret}&issuer={service}';

function _keyuri() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'user';
  var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'service';
  var secret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var protocol = 'otpauth://totp/';
  var value = data.replace('{user}', encodeURIComponent(user)).replace('{secret}', secret).replace(/{service}/g, encodeURIComponent(service));
  return protocol + value;
}

function token(secret, options) {
  return otplibCore.totpToken(decodeKey(secret), options);
}

var TOTP = totp.TOTP;

var Authenticator =
/*#__PURE__*/
function (_TOTP) {
  _inherits(Authenticator, _TOTP);

  function Authenticator() {
    var _this;

    _classCallCheck(this, Authenticator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Authenticator).call(this));
    _this._defaultOptions = {
      encoding: 'hex',
      epoch: null,
      step: 30,
      window: 0
    };
    _this._options = _this._defaultOptions;
    return _this;
  }

  _createClass(Authenticator, [{
    key: "getClass",
    value: function getClass() {
      return Authenticator;
    }
  }, {
    key: "encode",
    value: function encode() {
      return encodeKey.apply(void 0, arguments);
    }
  }, {
    key: "decode",
    value: function decode() {
      return decodeKey.apply(void 0, arguments);
    }
  }, {
    key: "keyuri",
    value: function keyuri() {
      return _keyuri.apply(void 0, arguments);
    }
  }, {
    key: "generateSecret",
    value: function generateSecret() {
      var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

      if (!len) {
        return '';
      }

      var secret = otplibUtils.secretKey(len, this.optionsAll);
      return encodeKey(secret);
    }
  }, {
    key: "generate",
    value: function generate(secret) {
      var opt = this.optionsAll;
      return token(secret || opt.secret, opt);
    }
  }, {
    key: "check",
    value: function check(token$$1, secret) {
      var opt = this.optionsAll;
      return _check(token$$1, secret || opt.secret, opt);
    }
  }, {
    key: "checkDelta",
    value: function checkDelta(token$$1, secret) {
      var opt = this.optionsAll;
      return _checkDelta(token$$1, secret || opt.secret, opt);
    }
  }]);

  return Authenticator;
}(TOTP);

Authenticator.prototype.Authenticator = Authenticator;
Authenticator.prototype.utils = {
  check: _check,
  checkDelta: _checkDelta,
  decodeKey: decodeKey,
  encodeKey: encodeKey,
  keyuri: _keyuri,
  token: token
};
var index = new Authenticator();
module.exports = index;