/**
 * otplib-totp
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

var otplibCore = require("./core");

var hotp = _interopDefault(require("./hotp"));

var HOTP = hotp.HOTP;

var TOTP =
/*#__PURE__*/
function (_HOTP) {
  _inherits(TOTP, _HOTP);

  function TOTP() {
    var _this;

    _classCallCheck(this, TOTP);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TOTP).call(this));
    _this._defaultOptions = {
      epoch: null,
      step: 30,
      window: 0
    };
    _this._options = _this._defaultOptions;
    return _this;
  }

  _createClass(TOTP, [{
    key: "getClass",
    value: function getClass() {
      return TOTP;
    }
  }, {
    key: "generate",
    value: function generate(secret) {
      var opt = this.optionsAll;
      return otplibCore.totpToken(secret || opt.secret, opt);
    }
  }, {
    key: "check",
    value: function check(token, secret) {
      var delta = this.checkDelta(token, secret);
      return Number.isInteger(delta);
    }
  }, {
    key: "checkDelta",
    value: function checkDelta(token, secret) {
      var opt = this.optionsAll;
      return otplibCore.totpCheckWithWindow(token, secret || opt.secret, opt);
    }
  }, {
    key: "verify",
    value: function verify(opts) {
      if (_typeof(opts) !== 'object' || opts == null) {
        return false;
      }

      return this.check(opts.token, opts.secret);
    }
  }, {
    key: "timeRemaining",
    value: function timeRemaining() {
      var opt = this.optionsAll;
      return otplibCore.totpTimeRemaining(opt.epoch, opt.step);
    }
  }, {
    key: "timeUsed",
    value: function timeUsed() {
      var opt = this.optionsAll;
      return otplibCore.totpTimeUsed(opt.epoch, opt.step);
    }
  }, {
    key: "optionsAll",
    get: function get() {
      return otplibCore.totpOptions(this._options);
    }
  }]);

  return TOTP;
}(HOTP);

TOTP.prototype.TOTP = TOTP;
var index = new TOTP();
module.exports = index;