(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mipha"] = factory();
	else
		root["Mipha"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isFunction = isFunction;
exports.isEmpty = isEmpty;
exports.camelCase = camelCase;
exports.convertEntity = convertEntity;
exports.merge = merge;

var _entities = __webpack_require__(11);

var _entities2 = _interopRequireDefault(_entities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = exports.noop = function noop() {};

function isFunction(f) {
  return typeof f === 'function';
}

function isEmpty(obj) {
  return typeof obj === 'undefined' || obj === null;
}

var dash = /-([a-z])/g;
function camelCase(str) {
  return str.replace(dash, function (all, capture) {
    return capture.toUpperCase();
  });
}

// thanks to regularjs
var rEntity = new RegExp("&(?:(#x[0-9a-fA-F]+)|(#[0-9]+)|(" + Object.keys(_entities2.default).join('|') + '));', 'gi');

function convertEntity(chr) {

  return ('' + chr).replace(rEntity, function (all, hex, dec, capture) {
    var charCode;
    if (dec) charCode = parseInt(dec.slice(1), 10);else if (hex) charCode = parseInt(hex.slice(2), 16);else charCode = _entities2.default[capture];

    return String.fromCharCode(charCode);
  });
}

function merge(o1, o2) {
  var o = {};
  for (var k in o1) {
    o[k] = o1[k];
  }
  for (var _k in o2) {
    if (_typeof(o2[_k]) === 'object') {
      if (!o[_k]) o[_k] = {};
      for (var m in o2[_k]) {
        o[_k][m] = o2[_k][m];
      }
    } else {
      o[_k] = o2[_k];
    }
  }
  return o;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCustomProp = isCustomProp;
exports.isEventProp = isEventProp;
exports.isMfProp = isMfProp;
exports.setCustomProp = setCustomProp;
exports.removeCustomProp = removeCustomProp;

var _util = __webpack_require__(0);

var _dom = __webpack_require__(2);

// on-click="say()"
// mf-class="{ red: isRed, 'text-red': isRed === 1 }"
// mf-class="red"
//
// mf-show
// mf-model
// mf-html

function isCustomProp(name) {
  return isEventProp(name) || isMfProp(name);
}

function isEventProp(name) {
  return (/^on-/.test(name)
  );
}

function isMfProp(name) {
  return (/^mf-/.test(name)
  );
}

function extractCustomPropName(name) {
  return name.slice(3).toLowerCase();
}

function setCustomProp($target, name, value) {
  if (isEventProp(name)) {
    $target.addEventListener(extractCustomPropName(name), value, false);
  } else if (isMfProp(name)) {
    name = extractCustomPropName(name);

    // class or style
    if (name === 'class') {
      Object.keys(value).forEach(function (k) {
        if (value[k]) {
          $target.classList.add(k);
        } else {
          $target.classList.remove(k);
        }
      });
    } else if (name === 'style') {
      Object.keys(value).forEach(function (k) {
        var k1 = (0, _util.camelCase)(k);
        $target.style[k1] = value[k];
      });
    } else if (name === 'show') {
      if (!!value === true) {
        $target.style.display = '';
      } else {
        $target.style.display = 'none';
      }
    } else if (name === 'html') {
      $target.innerHTML = value;
    } else if (name === 'model') {
      // @todo
    } else {
      (0, _dom.setProp)($target, name, value);
    }
  }
}

function removeCustomProp($target, name, value) {
  if (isEventProp(name)) {
    $target.removeEventListener(name, value, false);
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProp = setProp;
exports.removeProp = removeProp;
exports.setBooleanProp = setBooleanProp;
exports.removeBooleanProp = removeBooleanProp;
function setProp($target, name, value) {
  if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (name === 'htmlFor') {
    $target.setAttribute('for', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function removeProp($target, name, value) {
  if (name === 'className') {
    $target.removeAttribute('class');
  } else if (name === 'htmlFor') {
    $target.removeAttribute('for', value);
  } else if (typeof value === 'boolean') {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mipha = __webpack_require__(4);

var _Mipha2 = _interopRequireDefault(_Mipha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Mipha2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Mipha;

var _constants = __webpack_require__(5);

var _util = __webpack_require__(0);

var _parser = __webpack_require__(6);

var _parser2 = _interopRequireDefault(_parser);

var _h = __webpack_require__(8);

var _h2 = _interopRequireDefault(_h);

var _patch = __webpack_require__(9);

var _patch2 = _interopRequireDefault(_patch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mipha() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this._init(options);
}

var mo = Mipha.prototype;

mo.setState = function (state) {
  this.options.state = Object.assign({}, this.options.state, state);
  this._mountState2this(this.options);

  // 判断是不是有外层组件，如果有外层组件，则修改外层组件的 vnode，
  // 判断外层组件是否 isMount 确定外层是否 $mount
  // 若无，则按之前逻辑
  this.vnode = this._render(this, _h2.default);

  if (this.outers && this.outers.length) {
    this.outers.forEach(function (outer) {
      outer._insertVNodeFromComponents();
      if (outer.isMounted) {
        outer.$mount(outer.$parent);
      }
    });
  } else {
    if (this.isMounted) {
      this.$mount(this.$parent);
    }
  }
};

mo.$mount = function ($parent) {
  $parent = $parent || document.body;
  (0, _patch2.default)($parent, this.vnode, this.oldVNode);

  this.oldVNode = this.vnode;

  if (!this.isMounted) {
    this.mounted();
    this.isMounted = true;
    this.$parent = $parent;
  }
};

mo._init = function (options) {
  var _this = this;

  var template = (options.template || '').trim();
  options.state = options.state || {};
  options.methods = options.methods || {};
  this.options = options;
  this._render = new _parser2.default(template).parse();

  this.oldVNode = null;
  this.vnode = null;
  this.isMounted = false;
  this.components = {}; // includes components
  this.outers = []; // outer components

  _constants.LIFECYCLE_HOOKS.map(function (hook) {
    _this[hook] = options[hook] && (0, _util.isFunction)(options[hook]) ? options[hook] : _util.noop;
  });

  this._mount2this(options);

  this.vnode = this._render(this, _h2.default);

  this._insertVNodeFromComponents();

  this.created();
};

mo._mount2this = function (options) {
  this._mountState2this(options);
  for (var key in options.methods) {
    this[key] = options.methods[key];
  }
};

mo._mountState2this = function (options) {
  for (var key in options.state) {
    this[key] = options.state[key];
  }
};

mo._insertVNodeFromComponents = function () {
  var components = this.options.components;

  if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object' && Object.keys(components).length) {
    var names = Object.keys(components);
    this.originalVNode = this._render(this, _h2.default);
    if (this.originalVNode.children && this.originalVNode.children.length) {
      this.originalVNode.children = replaceVNodeChild(this.originalVNode.children, components, names, this);
      this.vnode = this.originalVNode;
    }
  }

  function replaceVNodeChild(children, components, names, self) {
    return children.map(function (child) {
      var i = names.indexOf(child.type);
      if (i === -1) return child;

      var component = self.components[names[i]];
      if (!component) {
        component = new components[names[i]]();
        self.components[names[i]] = component;

        // push outers
        if (component.outers.indexOf(self) === -1) {
          component.outers.push(self);
        }
      }

      if (child.children && child.children.length) {
        return replaceVNodeChild(child.chilren, components, names, self);
      }

      return component.vnode;
    });
  }
};

mo._destroy = function () {};

Mipha.extend = function () {
  var exOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var Super = this;

  var Sub = function MiphaComponent() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    options = (0, _util.merge)(Sub.options, options);
    this._init(options);
  };
  Sub.prototype = Object.create(Super.prototype);
  Sub.prototype.constructor = Sub;
  Sub.options = Object.assign({}, Super.options, exOptions);
  Sub['super'] = Super;

  Sub.extend = Super.extend;

  return Sub;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LIFECYCLE_HOOKS = exports.LIFECYCLE_HOOKS = ['created', 'mounted', 'destroyed'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tokenizer = __webpack_require__(7);

var _tokenizer2 = _interopRequireDefault(_tokenizer);

var _customProp = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var funcParam = /\(.*\)$/;

var Parser = function () {
  function Parser(input) {
    _classCallCheck(this, Parser);

    this.tokens = new _tokenizer2.default(input).init();
    this.current = 0;
  }

  _createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      var tokens = this.tokens;

      var funcBody = '';
      while (this.current < tokens.length) {
        funcBody += this.walk();
      }
      // remove , if , on } left
      funcBody = funcBody.replace(/,[\s]*\}/g, ' }');

      if (!funcBody || !funcBody.length) {
        // if empty template
        funcBody = 'h("!",{},[""])';
      }
      return new Function('context', 'h', 'with(context) { return ' + funcBody + ' }');
    }
  }, {
    key: 'walk',
    value: function walk() {
      var tokens = this.tokens;
      var token = tokens[this.current];

      if (token.type === 'comment') {
        this.current++;

        token.comment = token.comment || '';

        return 'h("!", {}, ["' + token.comment + '"])';
      }

      if (token.type === 'if') {
        this.current++;

        switch (token.mark) {
          case 'if':
            return '(function() { if (' + token.expr + ') { return ';
          case 'elseif':
            return '} else if (' + token.expr + ') { return ';
          case 'else':
            return '} else { return ';
          case '/if':
            return '} })()';
        }
      }

      if (token.type === 'list') {
        this.current++;

        switch (token.mark) {
          case 'list':
            return '(function() { return ' + token.data + '.map(function(_d, _i) {var ' + token.val + ' = _d; var ' + token.index + ' = _i; return ';
          case '/list':
            return '}) })()';
        }
      }

      if (token.type === 'expr') {
        this.current++;

        return '(function() { return ' + token.expr + ' })()';
      }

      if (token.type === 'text') {
        this.current++;

        return token.text;
      }

      if (token.type === 'element') {
        if (typeof token.unary !== 'undefined') {
          if (!token.unary) {
            // tag open

            var node = {
              type: token.tag,
              props: this.handleProps(token.attrs),
              children: []
            };

            token = tokens[++this.current];

            while (!(token.type === 'element' && typeof token.unary === 'undefined')) {
              // tag close
              var str = this.walk();
              if (token.type === 'text' && token.text && token.text.trim()) {
                str = '"' + str.trim() + '"';
              }
              if (!token.mark && str && str.trim() || token.mark && (token.mark === '/if' || token.mark === '/list')) {
                str += ',';
              }
              if (!token.mark) {
                str = str.trim();
              }

              str = str.replace(/return[\s]*,/g, 'return ');

              node.children.push(str);

              token = tokens[this.current];
            }

            var children = node.children.join('');

            if (children[children.length - 1] === ',') {
              children = children.substring(0, children.length - 1);
            }

            this.current++;

            return 'h("' + node.type + '", ' + node.props + ', [' + children + '])';
          }

          this.current++;
          return 'h("' + token.tag + '", ' + this.handleProps(token.attrs) + ', [])';
        } else {
          this.current++;
          return '';
        }
      }
    }
  }, {
    key: 'handleProps',
    value: function handleProps(attrs) {
      if (!attrs || !attrs.length) return '{}';
      var obj = '{';

      attrs.map(function (item) {
        var value = void 0;
        if ((0, _customProp.isEventProp)(item.name)) {
          if (funcParam.test(item.value)) {
            value = 'function($event) { return ' + item.value + '; }';
          } else {
            value = '(function() { return ' + item.value + '.bind(context); })()';
          }
          obj += '"' + item.name + '":' + value + ',';
        } else if ((0, _customProp.isMfProp)(item.name)) {
          value = '(function() { return ' + item.value + ' })()';
          obj += '"' + item.name + '":' + value + ',';
        } else {
          obj += '"' + item.name + '":"' + item.value + '",';
        }
      });

      obj = obj.substring(0, obj.length - 1);
      obj += '}';
      return obj;
    }
  }]);

  return Parser;
}();

exports.default = Parser;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Pure JavaScript HTML Parser
 * https://johnresig.com/blog/pure-javascript-html-parser/
 * by John Resig
 *
 * modified by DarkZone
 */

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[-\w]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

var closeSelf = makeMap('area,base,br,col,colgroup,command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr');

var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

var Tokenizer = function () {
  function Tokenizer(input) {
    _classCallCheck(this, Tokenizer);

    this.input = (input || '').trim();
    this.stack = [];
    this.tokens = [];
    this.root = false;

    this.last = function () {
      return this.stack[this.stack.length - 1];
    };
  }

  _createClass(Tokenizer, [{
    key: 'init',
    value: function init() {
      var input = this.input;
      var last = input;
      var match = void 0;
      var index = void 0;

      while (input) {
        var ch = input.charAt(0);

        if (ch === '<') {

          if (input.indexOf('<!--') === 0) {
            index = input.indexOf('-->');

            if (index >= 0) {
              this._handleComment(input.substring(4, index));
              input = input.substring(index + 3);
            }

            // end tag
          } else if (input.indexOf('</') === 0) {
            match = input.match(endTag);

            if (match) {
              input = input.substring(match[0].length);
              match[0].replace(endTag, this._handleEndTag.bind(this));
            }

            // start tag
          } else if (input.indexOf('<') === 0) {
            match = input.match(startTag);

            if (match) {
              input = input.substring(match[0].length);
              match[0].replace(startTag, this._handleElementStart.bind(this));
            }
          }
        } else if (ch === '{') {

          if (input.indexOf('{if') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleIfStart(input.substring(3, index), 'if');
              input = input.substring(index + 1);
            }
          } else if (input.indexOf('{/if}') === 0) {

            this._handleEndTag('', 'if');
            input = input.substring(5);
          } else if (input.indexOf('{elseif') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleIfStart(input.substring(7, index), 'elseif');
              input = input.substring(index + 1);
            }
          } else if (input.indexOf('{else}') === 0) {
            this._handleIfStart('', 'else');
            input = input.substring(6);
          } else if (input.indexOf('{list') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleListStart(input.substring(5, index), 'list');
              input = input.substring(index + 1);
            }
          } else if (input.indexOf('{/list}') === 0) {
            this._handleEndTag('', 'list');
            input = input.substring(7);
          } else if (input.indexOf('{') === 0) {
            index = input.indexOf('}');

            if (index >= 0) {
              this._handleExpr(input.substring(1, index));
              input = input.substring(index + 1);
            }
          }
        } else {

          var index1 = input.indexOf('<');
          var index2 = input.indexOf('{');
          if (index1 >= 0 && index2 >= 0) {
            index = index1 < index2 ? index1 : index2;
          } else if (index1 === -1 && !index2 === -1) {
            index = -1;
          } else if (index1 >= 0) {
            index = index1;
          } else if (index2 >= 0) {
            index = index2;
          }
          var text = index < 0 ? input : input.substring(0, index);
          input = index < 0 ? '' : input.substring(index);

          this._handleText(text);
        }

        if (last == input) {
          throw Error('parse template error');
        }
        last = input;
      }

      return this.tokens;
    }
  }, {
    key: '_handleComment',
    value: function _handleComment(comment) {
      this.tokens.push({
        type: 'comment',
        comment: comment
      });
    }
  }, {
    key: '_handleElementStart',
    value: function _handleElementStart(tag, tagName, rest, unary) {
      tagName = tagName.toLowerCase();

      // if inline element contains block element

      // if self closed element is written into eg: <img></img>
      if (closeSelf[tagName] && this.last() === tagName) {
        this._handleEndTag('', tagName);
      }

      unary = closeSelf[tagName] || !!unary;

      if (!unary) {
        if (!this.root) {
          this.stack.push(tagName);
          this.root = true;
        } else {
          // all element closed, when new element push , throw error
          if (!this.stack.length) {
            throw new Error('template must have only one root element.');
          } else {
            this.stack.push(tagName);
          }
        }
      } else {
        if (!this.root) {
          this.root = true;
        } else {
          // all element closed, when new element push , throw error
          if (!this.stack.length) {
            throw new Error('template must have only one root element.');
          }
        }
      }

      var attrs = [];

      rest.replace(attr, function (match, name) {
        /* eslint-disable */
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : '';

        /* eslint-enable */
        if (name === 'class') name = 'className';
        if (name === 'for') name = 'htmlFor';

        attrs.push({
          name: name,
          value: value
        });
      });

      this.tokens.push({
        type: 'element',
        tag: tagName,
        attrs: attrs,
        unary: unary
      });
    }
  }, {
    key: '_handleEndTag',
    value: function _handleEndTag(tag, tagName) {
      var pos = void 0;
      if (!tagName) {
        pos = 0;
      } else {
        for (pos = this.stack.length - 1; pos >= 0; pos--) {
          if (this.stack[pos] === tagName) break;
        }
      }

      if (pos >= 0) {
        for (var i = this.stack.length - 1; i >= pos; i--) {
          if (tagName === 'if') {
            this.tokens.push({
              type: 'if',
              mark: '/if'
            });
          } else if (tagName === 'list') {
            this.tokens.push({
              type: 'list',
              mark: '/list'
            });
          } else {
            this.tokens.push({
              type: 'element',
              tag: tagName
            });
          }
        }

        // Remove the open elements from the this.stack
        this.stack.length = pos;
      }
    }
  }, {
    key: '_handleIfStart',
    value: function _handleIfStart(expr, mark) {
      expr = expr.trim();

      if (mark === 'if') {
        this.stack.push('if');
      }

      if (mark === 'elseif' || mark === 'else') {
        if (this.last() !== 'if') {
          throw Error('there has unclosed if');
        }
      }

      this.tokens.push({
        type: 'if',
        expr: expr,
        mark: mark
      });
    }
  }, {
    key: '_handleListStart',
    value: function _handleListStart(expr) {
      expr = expr.trim();
      var arr = expr.split('as');
      if (arr) {
        if (arr[0]) arr[0] = arr[0].trim();
        if (arr[1]) arr[1] = arr[1].trim();
        this.tokens.push({
          type: 'list',
          data: arr[0] ? arr[0] : null,
          val: arr[1] ? arr[1] : null,
          index: arr[1] ? arr[1] + '_index' : null,
          mark: 'list'
        });

        this.stack.push('list');
      }
    }
  }, {
    key: '_handleText',
    value: function _handleText(text) {
      this.tokens.push({
        type: 'text',
        text: text
      });
    }
  }, {
    key: '_handleExpr',
    value: function _handleExpr(expr) {
      expr = expr.trim();

      this.tokens.push({
        type: 'expr',
        expr: expr
      });
    }
  }]);

  return Tokenizer;
}();

exports.default = Tokenizer;


function makeMap(str) {
  var obj = {},
      items = str.split(',');
  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }return obj;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = h;

var _util = __webpack_require__(0);

function h(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var cr = [];
  children.map(function (child) {
    if (Array.isArray(child)) {
      child.map(function (c) {
        if (!(0, _util.isEmpty)(c)) cr.push(c);
      });
    } else {
      if (!(0, _util.isEmpty)(child)) cr.push(child);
    }
  });
  return {
    type: type,
    props: props,
    children: cr
  };
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = updateElement;

var _util = __webpack_require__(0);

var _props = __webpack_require__(10);

var cachedRemoveNodes = [];

function updateElement($parent, newNode, oldNode) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    cachedRemoveNodes.push($parent.childNodes[index]);
    //$parent.removeChild($parent.childNodes[index])
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {

    (0, _props.updateProps)($parent.childNodes[index], newNode.props, oldNode.props);

    var newLen = newNode.children.length;
    var oldLen = oldNode.children.length;
    var $curParent = $parent.childNodes[index];
    for (var i = 0; i < newLen || i < oldLen; i++) {
      updateElement($curParent, newNode.children[i], oldNode.children[i], i);
    }
    if (cachedRemoveNodes.length) {
      cachedRemoveNodes.forEach(function (node) {
        $curParent.removeChild(node);
      });
      cachedRemoveNodes = [];
    }
  }
}

// create element by virtual dom

function createElement(node) {

  if (typeof node === 'string' || typeof node === 'number') {

    node = (0, _util.convertEntity)(node);

    return document.createTextNode(node);
  }

  if (node.type === '!') {
    return document.createComment(node.children[0]);
  }

  var $el = document.createElement(node.type);
  (0, _props.setProps)($el, node.props);

  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function changed(node1, node2) {
  return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProps = updateProps;
exports.setProps = setProps;

var _util = __webpack_require__(0);

var _dom = __webpack_require__(2);

var _customProp = __webpack_require__(1);

function updateProps($target, newProps) {
  var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var props = Object.assign({}, oldProps, newProps);
  Object.keys(props).forEach(function (name) {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}

function setProps($target, props) {
  Object.keys(props).forEach(function (name) {
    setPropX($target, name, props[name]);
  });
}

function updateProp($target, name, newValue, oldValue) {
  if ((0, _util.isEmpty)(newValue)) {
    removePropX($target, name, oldValue);
  } else if ((0, _util.isEmpty)(oldValue) || newValue !== oldValue) {
    // didnt handle event handler change
    if (newValue && oldValue && typeof newValue === 'function' && typeof oldValue === 'function') return;

    setPropX($target, name, newValue, oldValue);
  }
}

function setPropX($target, name, value) {
  if ((0, _customProp.isCustomProp)(name)) {
    (0, _customProp.setCustomProp)($target, name, value);
  } else {
    (0, _dom.setProp)($target, name, value);
  }
}

function removePropX($target, name, value) {
  if ((0, _customProp.isCustomProp)(name)) {
    (0, _customProp.removeCustomProp)($target, name, value);
  } else {
    (0, _dom.removeProp)($target, name, value);
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
exports.default = {
  'quot': 34,
  'amp': 38,
  'apos': 39,
  'lt': 60,
  'gt': 62,
  'nbsp': 160,
  'iexcl': 161,
  'cent': 162,
  'pound': 163,
  'curren': 164,
  'yen': 165,
  'brvbar': 166,
  'sect': 167,
  'uml': 168,
  'copy': 169,
  'ordf': 170,
  'laquo': 171,
  'not': 172,
  'shy': 173,
  'reg': 174,
  'macr': 175,
  'deg': 176,
  'plusmn': 177,
  'sup2': 178,
  'sup3': 179,
  'acute': 180,
  'micro': 181,
  'para': 182,
  'middot': 183,
  'cedil': 184,
  'sup1': 185,
  'ordm': 186,
  'raquo': 187,
  'frac14': 188,
  'frac12': 189,
  'frac34': 190,
  'iquest': 191,
  'Agrave': 192,
  'Aacute': 193,
  'Acirc': 194,
  'Atilde': 195,
  'Auml': 196,
  'Aring': 197,
  'AElig': 198,
  'Ccedil': 199,
  'Egrave': 200,
  'Eacute': 201,
  'Ecirc': 202,
  'Euml': 203,
  'Igrave': 204,
  'Iacute': 205,
  'Icirc': 206,
  'Iuml': 207,
  'ETH': 208,
  'Ntilde': 209,
  'Ograve': 210,
  'Oacute': 211,
  'Ocirc': 212,
  'Otilde': 213,
  'Ouml': 214,
  'times': 215,
  'Oslash': 216,
  'Ugrave': 217,
  'Uacute': 218,
  'Ucirc': 219,
  'Uuml': 220,
  'Yacute': 221,
  'THORN': 222,
  'szlig': 223,
  'agrave': 224,
  'aacute': 225,
  'acirc': 226,
  'atilde': 227,
  'auml': 228,
  'aring': 229,
  'aelig': 230,
  'ccedil': 231,
  'egrave': 232,
  'eacute': 233,
  'ecirc': 234,
  'euml': 235,
  'igrave': 236,
  'iacute': 237,
  'icirc': 238,
  'iuml': 239,
  'eth': 240,
  'ntilde': 241,
  'ograve': 242,
  'oacute': 243,
  'ocirc': 244,
  'otilde': 245,
  'ouml': 246,
  'divide': 247,
  'oslash': 248,
  'ugrave': 249,
  'uacute': 250,
  'ucirc': 251,
  'uuml': 252,
  'yacute': 253,
  'thorn': 254,
  'yuml': 255,
  'fnof': 402,
  'Alpha': 913,
  'Beta': 914,
  'Gamma': 915,
  'Delta': 916,
  'Epsilon': 917,
  'Zeta': 918,
  'Eta': 919,
  'Theta': 920,
  'Iota': 921,
  'Kappa': 922,
  'Lambda': 923,
  'Mu': 924,
  'Nu': 925,
  'Xi': 926,
  'Omicron': 927,
  'Pi': 928,
  'Rho': 929,
  'Sigma': 931,
  'Tau': 932,
  'Upsilon': 933,
  'Phi': 934,
  'Chi': 935,
  'Psi': 936,
  'Omega': 937,
  'alpha': 945,
  'beta': 946,
  'gamma': 947,
  'delta': 948,
  'epsilon': 949,
  'zeta': 950,
  'eta': 951,
  'theta': 952,
  'iota': 953,
  'kappa': 954,
  'lambda': 955,
  'mu': 956,
  'nu': 957,
  'xi': 958,
  'omicron': 959,
  'pi': 960,
  'rho': 961,
  'sigmaf': 962,
  'sigma': 963,
  'tau': 964,
  'upsilon': 965,
  'phi': 966,
  'chi': 967,
  'psi': 968,
  'omega': 969,
  'thetasym': 977,
  'upsih': 978,
  'piv': 982,
  'bull': 8226,
  'hellip': 8230,
  'prime': 8242,
  'Prime': 8243,
  'oline': 8254,
  'frasl': 8260,
  'weierp': 8472,
  'image': 8465,
  'real': 8476,
  'trade': 8482,
  'alefsym': 8501,
  'larr': 8592,
  'uarr': 8593,
  'rarr': 8594,
  'darr': 8595,
  'harr': 8596,
  'crarr': 8629,
  'lArr': 8656,
  'uArr': 8657,
  'rArr': 8658,
  'dArr': 8659,
  'hArr': 8660,
  'forall': 8704,
  'part': 8706,
  'exist': 8707,
  'empty': 8709,
  'nabla': 8711,
  'isin': 8712,
  'notin': 8713,
  'ni': 8715,
  'prod': 8719,
  'sum': 8721,
  'minus': 8722,
  'lowast': 8727,
  'radic': 8730,
  'prop': 8733,
  'infin': 8734,
  'ang': 8736,
  'and': 8743,
  'or': 8744,
  'cap': 8745,
  'cup': 8746,
  'int': 8747,
  'there4': 8756,
  'sim': 8764,
  'cong': 8773,
  'asymp': 8776,
  'ne': 8800,
  'equiv': 8801,
  'le': 8804,
  'ge': 8805,
  'sub': 8834,
  'sup': 8835,
  'nsub': 8836,
  'sube': 8838,
  'supe': 8839,
  'oplus': 8853,
  'otimes': 8855,
  'perp': 8869,
  'sdot': 8901,
  'lceil': 8968,
  'rceil': 8969,
  'lfloor': 8970,
  'rfloor': 8971,
  'lang': 9001,
  'rang': 9002,
  'loz': 9674,
  'spades': 9824,
  'clubs': 9827,
  'hearts': 9829,
  'diams': 9830,
  'OElig': 338,
  'oelig': 339,
  'Scaron': 352,
  'scaron': 353,
  'Yuml': 376,
  'circ': 710,
  'tilde': 732,
  'ensp': 8194,
  'emsp': 8195,
  'thinsp': 8201,
  'zwnj': 8204,
  'zwj': 8205,
  'lrm': 8206,
  'rlm': 8207,
  'ndash': 8211,
  'mdash': 8212,
  'lsquo': 8216,
  'rsquo': 8217,
  'sbquo': 8218,
  'ldquo': 8220,
  'rdquo': 8221,
  'bdquo': 8222,
  'dagger': 8224,
  'Dagger': 8225,
  'permil': 8240,
  'lsaquo': 8249,
  'rsaquo': 8250,
  'euro': 8364
};

/***/ })
/******/ ])["default"];
});