/**
 * otplib-hotp
 *
 * @author Gerald Yeo <contact@fusedthought.com>
 * @version: 11.0.1
 * @license: MIT
 **/
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var otplibCore = require("./core");

var HOTP =
/*#__PURE__*/
function () {
  function HOTP() {
    _classCallCheck(this, HOTP);

    this._defaultOptions = {};
    this._options = this._defaultOptions;
  }

  _createClass(HOTP, [{
    key: "getClass",
    value: function getClass() {
      return HOTP;
    }
  }, {
    key: "resetOptions",
    value: function resetOptions() {
      this._options = this.defaultOptions;
      return this;
    }
  }, {
    key: "generate",
    value: function generate(secret, counter) {
      var opt = this.optionsAll;
      return otplibCore.hotpToken(secret || opt.secret, counter, opt);
    }
  }, {
    key: "check",
    value: function check(token, secret, counter) {
      var opt = this.optionsAll;
      return otplibCore.hotpCheck(token, secret || opt.secret, counter, opt);
    }
  }, {
    key: "verify",
    value: function verify(opts) {
      if (_typeof(opts) !== 'object' || opts == null) {
        return false;
      }

      return this.check(opts.token, opts.secret, opts.counter);
    }
  }, {
    key: "defaultOptions",
    set: function set() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (opt) {
        this._defaultOptions = Object.assign({}, this.defaultOptions, opt);
        this.options = opt;
      }
    },
    get: function get() {
      return this._defaultOptions;
    }
  }, {
    key: "options",
    set: function set() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (opt) {
        this._options = Object.assign({}, this._options, opt);
      }
    },
    get: function get() {
      return Object.assign({}, this._options);
    }
  }, {
    key: "optionsAll",
    get: function get() {
      return otplibCore.hotpOptions(this._options);
    }
  }]);

  return HOTP;
}();

HOTP.prototype.HOTP = HOTP;
var index = new HOTP();
module.exports = index;