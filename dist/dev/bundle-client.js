/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./actions/ColorThemeActions.js":
/*!**************************************!*\
  !*** ./actions/ColorThemeActions.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar setColorTheme = exports.setColorTheme = function setColorTheme() {\n  var colorKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'main';\n  return {\n    type: 'SET_COLOR',\n    colorKey: colorKey\n  };\n};\n\nvar resetColorTheme = exports.resetColorTheme = function resetColorTheme() {\n  return {\n    type: 'RESET_COLOR'\n  };\n};\n\n//# sourceURL=webpack:///./actions/ColorThemeActions.js?");

/***/ }),

/***/ "./app.jsx":
/*!*****************!*\
  !*** ./app.jsx ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\n__webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"bootstrap/dist/css/bootstrap.min.css\");\n\nvar _AppRouter = __webpack_require__(/*! routers/AppRouter */ \"./routers/AppRouter.jsx\");\n\nvar _AppRouter2 = _interopRequireDefault(_AppRouter);\n\nvar _configureStore = __webpack_require__(/*! store/configureStore */ \"./store/configureStore.js\");\n\nvar _configureStore2 = _interopRequireDefault(_configureStore);\n\n__webpack_require__(/*! styles/styles.scss */ \"./styles/styles.scss\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar store = (0, _configureStore2.default)();\nvar App = _react2.default.createElement(\n  _reactRedux.Provider,\n  { store: store },\n  _react2.default.createElement(_AppRouter2.default, null)\n);\n\n// For debugging:\nstore.subscribe(function () {\n  // console.log('action', store.getState());\n});\n\n_reactDom2.default.render(App, document.getElementById('app'));\n\n//# sourceURL=webpack:///./app.jsx?");

/***/ }),

/***/ "./components/ContentPage/ContentAreaItem.jsx":
/*!****************************************************!*\
  !*** ./components/ContentPage/ContentAreaItem.jsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _getColorFromKey = __webpack_require__(/*! utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the ContentAreaItem stateless functional component.\n *\n * @param {object} props\n */\nvar ContentAreaItem = function ContentAreaItem(props) {\n  var itemKey = props.itemKey,\n      urlKey = props.urlKey,\n      colorKey = props.colorKey,\n      title = props.title,\n      description = props.description,\n      children = props.children,\n      isTopicItem = props.isTopicItem;\n\n\n  return _react2.default.createElement(\n    'div',\n    { id: itemKey, className: 'content-area-item' },\n    _react2.default.createElement(\n      'div',\n      { className: 'content-area-item-header' },\n      _react2.default.createElement(\n        _reactRouterDom.Link,\n        { to: '' + urlKey },\n        _react2.default.createElement(\n          'div',\n          {\n            className: 'content-area-item-header-title',\n            style: { color: (0, _getColorFromKey2.default)(colorKey) }\n          },\n          title\n        )\n      ),\n      _react2.default.createElement(\n        'div',\n        { className: 'content-area-item-header-description' },\n        description\n      )\n    ),\n    _react2.default.createElement(\n      'div',\n      { className: 'content-area-item-children' },\n      children && children.map(function (item, i) {\n        return _react2.default.createElement(\n          'div',\n          { className: 'content-area-item-children-area-item', key: i },\n          _react2.default.createElement(\n            'div',\n            { className: 'content-area-item-children-area-item-link' },\n            _react2.default.createElement(\n              _reactRouterDom.Link,\n              {\n                to: isTopicItem ? props.urlKey + '?item=' + i : props.urlKey + '/' + item.key,\n                style: { color: (0, _getColorFromKey2.default)(props.colorKey) }\n              },\n              _react2.default.createElement('i', { className: 'fa fa-star' }),\n              _react2.default.createElement(\n                'span',\n                null,\n                item.title\n              )\n            )\n          )\n        );\n      })\n    )\n  );\n};\n\nContentAreaItem.propTypes = {\n  children: _propTypes2.default.array,\n  description: _propTypes2.default.string,\n  itemKey: _propTypes2.default.string,\n  title: _propTypes2.default.string,\n  urlKey: _propTypes2.default.string,\n  isTopicItem: _propTypes2.default.bool,\n  colorKey: _propTypes2.default.number\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(ContentAreaItem);\n\n//# sourceURL=webpack:///./components/ContentPage/ContentAreaItem.jsx?");

/***/ }),

/***/ "./components/ContentPage/ContentAreaItemContainer.jsx":
/*!*************************************************************!*\
  !*** ./components/ContentPage/ContentAreaItemContainer.jsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _ContentAreaItem = __webpack_require__(/*! ./ContentAreaItem */ \"./components/ContentPage/ContentAreaItem.jsx\");\n\nvar _ContentAreaItem2 = _interopRequireDefault(_ContentAreaItem);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the ContentAreaItemContainer stateless functional component.\n *\n * @param {object} props\n */\nvar ContentAreaItemContainer = function ContentAreaItemContainer(props) {\n  var contentData = props.contentData;\n\n\n  return _react2.default.createElement(\n    'div',\n    { className: 'content-area-item-container' },\n    contentData && contentData.map(function (item, i) {\n      return _react2.default.createElement(_ContentAreaItem2.default, {\n        key: i,\n        title: item.title,\n        itemKey: item.key,\n        urlKey: item.urlKey,\n        description: item.description,\n        children: item.children,\n        isTopicItem: item.isTopicItem\n      });\n    })\n  );\n}; /* eslint-disable react/no-children-prop */\n\nContentAreaItemContainer.propTypes = {\n  contentData: _propTypes2.default.array\n};\n\nexports.default = ContentAreaItemContainer;\n\n//# sourceURL=webpack:///./components/ContentPage/ContentAreaItemContainer.jsx?");

/***/ }),

/***/ "./components/ContentPage/ContentAreaTableOfContents.jsx":
/*!***************************************************************!*\
  !*** ./components/ContentPage/ContentAreaTableOfContents.jsx ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRouterHashLink = __webpack_require__(/*! react-router-hash-link */ \"react-router-hash-link\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ContentAreaTableOfContents = function (_React$Component) {\n  _inherits(ContentAreaTableOfContents, _React$Component);\n\n  function ContentAreaTableOfContents(props) {\n    _classCallCheck(this, ContentAreaTableOfContents);\n\n    var _this = _possibleConstructorReturn(this, (ContentAreaTableOfContents.__proto__ || Object.getPrototypeOf(ContentAreaTableOfContents)).call(this, props));\n\n    _this.handleSelectTableItem = function (index) {\n      _this.setState({ selectedIndex: index });\n    };\n\n    _this.getSelectedClassName = function (index) {\n      var selectedIndex = _this.state.selectedIndex;\n\n      return index === selectedIndex ? 'content-area-toc-item-selected' : '';\n    };\n\n    _this.state = {\n      selectedIndex: -1\n    };\n    return _this;\n  }\n\n  /**\n   * Handles the selected index change when a table item is selected.\n   *\n   * @param {number} index\n   */\n\n\n  /**\n   * Returns the class name corresponding to when the item is selected in the table of contents.\n   */\n\n\n  _createClass(ContentAreaTableOfContents, [{\n    key: 'render',\n\n\n    /**\n     * Renders the ContentAreaTableOfContents component.\n     */\n    value: function render() {\n      var _this2 = this;\n\n      var _props = this.props,\n          title = _props.title,\n          contentData = _props.contentData;\n\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'content-area-toc' },\n        _react2.default.createElement(\n          'div',\n          { className: 'content-area-toc-title' },\n          title\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'content-area-toc-container' },\n          contentData && contentData.map(function (item, i) {\n            return _react2.default.createElement(\n              'div',\n              {\n                className: 'content-area-toc-item ' + _this2.getSelectedClassName(i),\n                key: i\n              },\n              _react2.default.createElement(\n                _reactRouterHashLink.HashLink,\n                {\n                  smooth: true,\n                  to: '#' + item.key,\n                  onClick: function onClick() {\n                    return _this2.handleSelectTableItem(i);\n                  }\n                },\n                item.title\n              )\n            );\n          })\n        )\n      );\n    }\n  }]);\n\n  return ContentAreaTableOfContents;\n}(_react2.default.Component);\n\nContentAreaTableOfContents.propTypes = {\n  contentData: _propTypes2.default.array,\n  title: _propTypes2.default.string\n};\n\nexports.default = ContentAreaTableOfContents;\n\n//# sourceURL=webpack:///./components/ContentPage/ContentAreaTableOfContents.jsx?");

/***/ }),

/***/ "./components/ContentPage/ContentPage.jsx":
/*!************************************************!*\
  !*** ./components/ContentPage/ContentPage.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactMdSpinner = __webpack_require__(/*! react-md-spinner */ \"react-md-spinner\");\n\nvar _reactMdSpinner2 = _interopRequireDefault(_reactMdSpinner);\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _JumbotronMedium = __webpack_require__(/*! components/JumbotronMedium */ \"./components/JumbotronMedium/index.js\");\n\nvar _JumbotronMedium2 = _interopRequireDefault(_JumbotronMedium);\n\nvar _routeUtils = __webpack_require__(/*! utils/routeUtils */ \"./utils/routeUtils.js\");\n\nvar _getColorFromKey = __webpack_require__(/*! utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nvar _topicItemUtils = __webpack_require__(/*! utils/topicItemUtils */ \"./utils/topicItemUtils.js\");\n\nvar _ColorThemeActions = __webpack_require__(/*! actions/ColorThemeActions */ \"./actions/ColorThemeActions.js\");\n\nvar _ContentAreaTableOfContents = __webpack_require__(/*! ./ContentAreaTableOfContents */ \"./components/ContentPage/ContentAreaTableOfContents.jsx\");\n\nvar _ContentAreaTableOfContents2 = _interopRequireDefault(_ContentAreaTableOfContents);\n\nvar _ContentAreaItemContainer = __webpack_require__(/*! ./ContentAreaItemContainer */ \"./components/ContentPage/ContentAreaItemContainer.jsx\");\n\nvar _ContentAreaItemContainer2 = _interopRequireDefault(_ContentAreaItemContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ContentPage = function (_React$Component) {\n  _inherits(ContentPage, _React$Component);\n\n  function ContentPage(props) {\n    _classCallCheck(this, ContentPage);\n\n    var _this = _possibleConstructorReturn(this, (ContentPage.__proto__ || Object.getPrototypeOf(ContentPage)).call(this, props));\n\n    _this.configureDataByRouteParams = function (params) {\n      var categoryKey = params.categoryKey,\n          subcategoryKey = params.subcategoryKey;\n\n\n      if (categoryKey && subcategoryKey) {\n        _this.requestSubcategoryData(categoryKey, subcategoryKey);\n      } else if (categoryKey) {\n        _this.requestCategoryData(categoryKey);\n      } else {\n        _this.requestCategoriesData();\n      }\n    };\n\n    _this.requestSubcategoryData = function (categoryKey, subcategoryKey) {\n      var subcategory = void 0;\n      Promise.all([fetch('/data/extended/categories/' + categoryKey + '/' + subcategoryKey), fetch('/data/utils/categories-color-key-mapping')]).then(function (result) {\n        return Promise.all(result.map(function (x) {\n          return x.json();\n        }));\n      }).then(function (result) {\n        var _result = _slicedToArray(result, 2),\n            subcategoryData = _result[0],\n            colorKeyMapping = _result[1];\n\n        if (result.error) {\n          throw result;\n        }\n\n        subcategory = subcategoryData.data;\n\n        _this.props.dispatch((0, _ColorThemeActions.setColorTheme)(colorKeyMapping.data[subcategory.parent]));\n        _this.setState({ title: subcategory.title });\n\n        return Promise.all(subcategory.children.map(function (topic) {\n          return fetch('/data/categories/' + categoryKey + '/' + subcategory.slug + '/' + topic.slug);\n        }));\n      }).then(function (result) {\n        return Promise.all(result.map(function (x) {\n          return x.json();\n        }));\n      }).then(function (result) {\n        var contentData = [];\n        result.forEach(function (topic) {\n          var _topic$data = topic.data,\n              title = _topic$data.title,\n              slug = _topic$data.slug,\n              description = _topic$data.description,\n              children = _topic$data.children;\n          var _subcategory = subcategory,\n              colorKey = _subcategory.colorKey;\n\n          var urlKey = '/categories/' + subcategory.key + '/' + slug;\n          contentData.push({\n            title: title,\n            description: description,\n            children: (0, _topicItemUtils.getTopicItemTypes)(children),\n            colorKey: colorKey,\n            urlKey: urlKey,\n            key: slug,\n            isTopicItem: true\n          });\n        });\n\n        _this.setState({ contentData: contentData });\n      }).catch(function (err) {\n        return _this.setState({ error: err });\n      });\n    };\n\n    _this.requestCategoryData = function (categoryKey) {\n      var category = void 0;\n      fetch('/data/extended/categories/' + categoryKey).then(function (result) {\n        return result.json();\n      }).then(function (result) {\n        if (result.error) {\n          throw result;\n        }\n\n        category = result.data;\n\n        _this.props.dispatch((0, _ColorThemeActions.setColorTheme)(category.colorKey));\n        _this.setState({ title: category.title });\n\n        return Promise.all(category.children.map(function (subcategory) {\n          return fetch('/data/extended/categories/' + categoryKey + '/' + subcategory.slug);\n        }));\n      }).then(function (result) {\n        return Promise.all(result.map(function (x) {\n          return x.json();\n        }));\n      }).then(function (result) {\n        var contentData = [];\n        result.forEach(function (subcategory) {\n          var _subcategory$data = subcategory.data,\n              title = _subcategory$data.title,\n              slug = _subcategory$data.slug,\n              description = _subcategory$data.description;\n          var colorKey = category.colorKey.colorKey;\n\n          var urlKey = '/categories/' + category.slug + '/' + slug;\n          var children = subcategory.data.children.map(function (child) {\n            return {\n              title: child.title,\n              key: child.slug\n            };\n          });\n          contentData.push({\n            title: title,\n            description: description,\n            children: children,\n            colorKey: colorKey,\n            urlKey: urlKey,\n            key: slug,\n            isTopicItem: false\n          });\n        });\n\n        _this.setState({ contentData: contentData });\n      }).catch(function (err) {\n        return _this.setState({ error: err });\n      });\n    };\n\n    _this.requestCategoriesData = function () {\n      _this.props.dispatch((0, _ColorThemeActions.resetColorTheme)());\n\n      fetch('/data/extended/categories').then(function (result) {\n        return result.json();\n      }).then(function (result) {\n        if (result.error) {\n          throw result;\n        }\n\n        var contentData = [];\n        result.data.forEach(function (category) {\n          var title = category.title,\n              key = category.key,\n              description = category.description,\n              colorKey = category.colorKey;\n\n          var urlKey = '/categories/' + key;\n          var children = category.children.map(function (child) {\n            return {\n              title: child.title,\n              key: child.slug\n            };\n          });\n          contentData.push({\n            title: title,\n            key: key,\n            description: description,\n            children: children,\n            colorKey: colorKey,\n            urlKey: urlKey,\n            isTopicItem: false\n          });\n        });\n\n        _this.setState({\n          contentData: contentData,\n          title: 'Categories'\n        });\n      }).catch(function (err) {\n        return _this.setState({ error: err });\n      });\n    };\n\n    _this.state = {\n      contentData: [],\n      title: '',\n      loading: true,\n      error: ''\n    };\n    return _this;\n  }\n\n  _createClass(ContentPage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      var _this2 = this;\n\n      window.scrollTo(0, 0);\n      this.configureDataByRouteParams(this.props.match.params);\n\n      this.setState({ loading: true });\n      setTimeout(function () {\n        _this2.setState({ loading: false });\n      }, 500);\n    }\n  }, {\n    key: 'componentWillReceiveProps',\n    value: function componentWillReceiveProps(newProps) {\n      var _this3 = this;\n\n      this.configureDataByRouteParams(newProps.match.params);\n\n      var oldKey = (0, _routeUtils.getContentUrlKey)(this.props.match.params).trim();\n      var newKey = (0, _routeUtils.getContentUrlKey)(newProps.match.params).trim();\n      if (oldKey !== newKey) {\n        window.scrollTo(0, 0);\n        this.setState({ loading: true });\n        setTimeout(function () {\n          _this3.setState({ loading: false });\n        }, 500);\n      }\n    }\n\n    /**\n     * Configures the content page dynamically based on the route parameters. If the parameters are\n     * not valid, then it will redirect to the main page.\n     * i.e\n     * - none -> categories page\n     * - categoryKey -> category page\n     * - categoryKey, subcategoryKey -> subcategory page\n     *\n     * @param {object} params\n     */\n\n\n    /**\n     * Makes request to the server to get the data for a particular subcategory.\n     *\n     * @param {string} categoryKey\n     * @param {string} subcategoryKey\n     */\n\n\n    /**\n     * Makes request to the server to get the data for a particular category.\n     *\n     * @param {string} categoryKey\n     */\n\n\n    /**\n     * Makes request to the server to get all categories data.\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the ContentPage component.\n     */\n    value: function render() {\n      if (this.state.error) {\n        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });\n      }\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'content-page-container' },\n        _react2.default.createElement(_JumbotronMedium2.default, {\n          title: this.state.title\n        }),\n        this.state.loading ? _react2.default.createElement(\n          'div',\n          { className: 'content-page-loader' },\n          _react2.default.createElement(_reactMdSpinner2.default, {\n            size: 50,\n            singleColor: (0, _getColorFromKey2.default)(this.props.colorKey)\n          })\n        ) : _react2.default.createElement(\n          _reactstrap.Container,\n          { fluid: true },\n          _react2.default.createElement(\n            _reactstrap.Row,\n            null,\n            _react2.default.createElement(\n              _reactstrap.Col,\n              { md: '2', sm: '2' },\n              _react2.default.createElement(_ContentAreaTableOfContents2.default, {\n                title: 'Content',\n                contentData: this.state.contentData.map(function (item) {\n                  return {\n                    title: item.title,\n                    key: item.key\n                  };\n                })\n              })\n            ),\n            _react2.default.createElement(\n              _reactstrap.Col,\n              { md: '8', sm: '10' },\n              _react2.default.createElement(_ContentAreaItemContainer2.default, {\n                contentData: this.state.contentData\n              })\n            ),\n            _react2.default.createElement(_reactstrap.Col, { md: '2', sm: '0' })\n          )\n        )\n      );\n    }\n  }]);\n\n  return ContentPage;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(ContentPage);\n\n//# sourceURL=webpack:///./components/ContentPage/ContentPage.jsx?");

/***/ }),

/***/ "./components/ContentPage/index.js":
/*!*****************************************!*\
  !*** ./components/ContentPage/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _ContentPage = __webpack_require__(/*! ./ContentPage */ \"./components/ContentPage/ContentPage.jsx\");\n\nvar _ContentPage2 = _interopRequireDefault(_ContentPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _ContentPage2.default;\n\n//# sourceURL=webpack:///./components/ContentPage/index.js?");

/***/ }),

/***/ "./components/DashboardPage/DashboardPage.jsx":
/*!****************************************************!*\
  !*** ./components/DashboardPage/DashboardPage.jsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar _moment2 = _interopRequireDefault(_moment);\n\nvar _reactCalendarHeatmap = __webpack_require__(/*! react-calendar-heatmap */ \"react-calendar-heatmap\");\n\nvar _reactCalendarHeatmap2 = _interopRequireDefault(_reactCalendarHeatmap);\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _DashboardPageBookmarkItem = __webpack_require__(/*! ./DashboardPageBookmarkItem */ \"./components/DashboardPage/DashboardPageBookmarkItem.jsx\");\n\nvar _DashboardPageBookmarkItem2 = _interopRequireDefault(_DashboardPageBookmarkItem);\n\nvar _DashboardPageHeader = __webpack_require__(/*! ./DashboardPageHeader */ \"./components/DashboardPage/DashboardPageHeader.jsx\");\n\nvar _DashboardPageHeader2 = _interopRequireDefault(_DashboardPageHeader);\n\nvar _DashboardProgressContainer = __webpack_require__(/*! ./DashboardProgressContainer */ \"./components/DashboardPage/DashboardProgressContainer.jsx\");\n\nvar _DashboardProgressContainer2 = _interopRequireDefault(_DashboardProgressContainer);\n\nvar _ColorThemeActions = __webpack_require__(/*! ../../actions/ColorThemeActions */ \"./actions/ColorThemeActions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar sampleBookmarkData = [{\n  topicItemTitle: 'Introduction',\n  subcategoryTitle: 'Lists',\n  categoryTitle: 'Data Structures',\n  type: 'article'\n}, {\n  topicItemTitle: 'Linked List',\n  subcategoryTitle: 'Lists',\n  categoryTitle: 'Data Structures',\n  type: 'code'\n}, {\n  topicItemTitle: 'Stack',\n  subcategoryTitle: 'Lists',\n  categoryTitle: 'Data Structures',\n  type: 'video'\n}, {\n  topicItemTitle: 'Introduction',\n  subcategoryTitle: 'Sorting',\n  categoryTitle: 'General Algorithms',\n  type: 'article'\n}, {\n  topicItemTitle: 'Merge Sort',\n  subcategoryTitle: 'Sorting',\n  categoryTitle: 'General Algorithms',\n  type: 'code'\n}, {\n  topicItemTitle: 'Quick Sort',\n  subcategoryTitle: 'Sorting',\n  categoryTitle: 'General Algorithms',\n  type: 'video'\n}];\n\nvar DashboardPage = function (_React$Component) {\n  _inherits(DashboardPage, _React$Component);\n\n  function DashboardPage(props) {\n    _classCallCheck(this, DashboardPage);\n\n    var _this = _possibleConstructorReturn(this, (DashboardPage.__proto__ || Object.getPrototypeOf(DashboardPage)).call(this, props));\n\n    _this.state = {\n      fullName: '',\n      uncompleted: 0,\n      completed: 0\n    };\n    return _this;\n  }\n\n  _createClass(DashboardPage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.props.dispatch((0, _ColorThemeActions.resetColorTheme)());\n\n      // request current user\n\n      this.setState({\n        fullName: 'John Smith',\n        uncompleted: 150,\n        completed: 25\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        _reactstrap.Container,\n        { fluid: true },\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '8' },\n            _react2.default.createElement(\n              'div',\n              { className: 'dashboard-page-container' },\n              _react2.default.createElement(_DashboardPageHeader2.default, {\n                fullName: this.state.fullName\n              }),\n              _react2.default.createElement(_DashboardProgressContainer2.default, {\n                uncompleted: this.state.uncompleted,\n                completed: this.state.completed\n              })\n            )\n          ),\n          _react2.default.createElement(_reactstrap.Col, { md: '2' })\n        ),\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '8' },\n            _react2.default.createElement(\n              'div',\n              { className: 'dashboard-page-bookmarks-container' },\n              _react2.default.createElement(\n                'div',\n                { className: 'dashboard-page-bookmarks-header' },\n                'Daily Activity'\n              ),\n              _react2.default.createElement(\n                'div',\n                { className: 'dashboard-page-bookmarks-body' },\n                _react2.default.createElement(_reactCalendarHeatmap2.default, {\n                  className: 'dashboard-page-calendar-heatmap',\n                  startDate: (0, _moment2.default)(),\n                  endDate: (0, _moment2.default)().add(365, 'day'),\n                  values: [{ date: '2016-01-01' }, { date: '2016-01-22' }, { date: '2016-01-30' }],\n                  classForValue: function classForValue(value) {\n                    if (!value) {\n                      return 'color-empty';\n                    }\n\n                    /* eslint-disable no-else-return */\n                    if (!value.count || value.count >= 0 && value.count <= 3) {\n                      return 'color-scale-1';\n                    } else if (value.count <= 5) {\n                      return 'color-scale-2';\n                    } else if (value.count <= 7) {\n                      return 'color-scale-3';\n                    } else {\n                      return 'color-scale-4';\n                    }\n                  }\n                })\n              )\n            )\n          ),\n          _react2.default.createElement(_reactstrap.Col, { md: '2' })\n        ),\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '8' },\n            _react2.default.createElement(\n              'div',\n              { className: 'dashboard-page-bookmarks-container' },\n              _react2.default.createElement(\n                'div',\n                { className: 'dashboard-page-bookmarks-header' },\n                'Saved Bookmarks'\n              ),\n              _react2.default.createElement(\n                'div',\n                { className: 'dashboard-page-bookmarks-body' },\n                sampleBookmarkData.map(function (bookmark, i) {\n                  return _react2.default.createElement(_DashboardPageBookmarkItem2.default, _extends({\n                    key: i\n                  }, bookmark));\n                })\n              )\n            )\n          ),\n          _react2.default.createElement(_reactstrap.Col, { md: '2' })\n        )\n      );\n    }\n  }]);\n\n  return DashboardPage;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps))(DashboardPage);\n\n//# sourceURL=webpack:///./components/DashboardPage/DashboardPage.jsx?");

/***/ }),

/***/ "./components/DashboardPage/DashboardPageBookmarkItem.jsx":
/*!****************************************************************!*\
  !*** ./components/DashboardPage/DashboardPageBookmarkItem.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the DashboardPageBookmarkItem stateless functional component.\n *\n * @param {object} props\n */\nvar DashboardPageBookmarkItem = function DashboardPageBookmarkItem(props) {\n  var typeTitle = void 0;\n  var iconComponent = void 0;\n\n  switch (props.type) {\n    case 'article':\n      typeTitle = 'Article';\n      iconComponent = _react2.default.createElement('i', { className: 'fas fa-newspaper' });\n      break;\n    case 'code':\n      typeTitle = 'Code';\n      iconComponent = _react2.default.createElement('i', { className: 'fas fa-code' });\n      break;\n    case 'video':\n      typeTitle = 'Video';\n      iconComponent = _react2.default.createElement('i', { className: 'fas fa-play' });\n      break;\n    default:\n      break;\n  }\n\n  return _react2.default.createElement(\n    'div',\n    { className: 'card dashboard-page-bookmarks-item-container' },\n    _react2.default.createElement(\n      'div',\n      { className: 'card-body' },\n      _react2.default.createElement(\n        'div',\n        { className: 'row' },\n        _react2.default.createElement(\n          'div',\n          { className: 'col-md-2' },\n          _react2.default.createElement(\n            'div',\n            { className: 'dashboard-page-bookmarks-item-type' },\n            _react2.default.createElement(\n              'div',\n              { className: 'dashboard-page-bookmarks-item-title' },\n              typeTitle\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'dashboard-page-bookmarks-item-subtitle' },\n              iconComponent\n            )\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'col-md-8' },\n          _react2.default.createElement(\n            'div',\n            { className: 'dashboard-page-bookmarks-item-title' },\n            props.topicItemTitle\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'dashboard-page-bookmarks-item-subtitle' },\n            props.categoryTitle,\n            '\\u203A',\n            props.subcategoryTitle\n          )\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'col-md-2' },\n          _react2.default.createElement(\n            'div',\n            { className: 'dashboard-page-bookmarks-item-delete' },\n            _react2.default.createElement('i', { className: 'fas fa-times dashboard-page-bookmarks-item-delete-btn' })\n          )\n        )\n      )\n    )\n  );\n};\n\nDashboardPageBookmarkItem.propTypes = {\n  topicItemTitle: _propTypes2.default.string,\n  subcategoryTitle: _propTypes2.default.string,\n  categoryTitle: _propTypes2.default.string,\n  type: _propTypes2.default.string\n};\n\nexports.default = DashboardPageBookmarkItem;\n\n//# sourceURL=webpack:///./components/DashboardPage/DashboardPageBookmarkItem.jsx?");

/***/ }),

/***/ "./components/DashboardPage/DashboardPageHeader.jsx":
/*!**********************************************************!*\
  !*** ./components/DashboardPage/DashboardPageHeader.jsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the DashboardPageHeader stateless functional component.\n *\n * @param {object} props\n */\nvar DashboardPageHeader = function DashboardPageHeader(props) {\n  var text = 'Welcome back, ' + props.fullName + '.';\n\n  return _react2.default.createElement(\n    'div',\n    { className: 'dashboard-page-header' },\n    text\n  );\n};\n\nDashboardPageHeader.propTypes = {\n  fullName: _propTypes2.default.string\n};\n\nexports.default = DashboardPageHeader;\n\n//# sourceURL=webpack:///./components/DashboardPage/DashboardPageHeader.jsx?");

/***/ }),

/***/ "./components/DashboardPage/DashboardProgressContainer.jsx":
/*!*****************************************************************!*\
  !*** ./components/DashboardPage/DashboardProgressContainer.jsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reactChartjs = __webpack_require__(/*! react-chartjs-2 */ \"react-chartjs-2\");\n\nvar _styles = __webpack_require__(/*! @material-ui/core/styles */ \"@material-ui/core/styles\");\n\nvar _core = __webpack_require__(/*! @material-ui/core */ \"@material-ui/core\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar materialUIStyles = function materialUIStyles(theme) {\n  return {\n    root: {\n      display: 'flex',\n      flexWrap: 'wrap'\n    },\n    formControl: {\n      margin: theme.spacing.unit,\n      minWidth: 200\n    },\n    selectEmpty: {\n      marginTop: theme.spacing.unit * 2\n    }\n  };\n};\n\n// TODO: fetch this list from server\nvar categories = ['Data Structures', 'General Algorithms', 'Strings', 'Graphs', 'Randomization', 'Mathematics', 'Dynamic Programming', 'Algorithmic Analysis', 'Software Engineering'];\n\nvar DashboardProgressContainer = function (_React$Component) {\n  _inherits(DashboardProgressContainer, _React$Component);\n\n  function DashboardProgressContainer(props) {\n    _classCallCheck(this, DashboardProgressContainer);\n\n    var _this = _possibleConstructorReturn(this, (DashboardProgressContainer.__proto__ || Object.getPrototypeOf(DashboardProgressContainer)).call(this, props));\n\n    _this.getPercentage = function (num) {\n      var total = _this.props.uncompleted + _this.props.completed;\n      if (total === 0) {\n        return '0%';\n      }\n      return Math.round(num / total * 100) + '%';\n    };\n\n    _this.createData = function (uncompleted, completed) {\n      return {\n        labels: ['Uncompleted', 'Completed'],\n        datasets: [{\n          data: [uncompleted, completed],\n          backgroundColor: ['#BDBDBD', '#66BB6A'],\n          hoverBackgroundColor: ['#BDBDBD', '#66BB6A']\n        }]\n      };\n    };\n\n    _this.handleChange = function (evt) {\n      console.log(evt.target.value);\n      _this.setState(_defineProperty({}, evt.target.name, evt.target.value));\n    };\n\n    _this.state = {\n      selected: ''\n    };\n    return _this;\n  }\n\n  /**\n   * Returns the percentage given number.\n   *\n   * @param {number} num\n   */\n\n\n  /**\n   * Creates the data for the Chart.js Doughnut chart.\n   *\n   * @param {number} uncompleted\n   * @param {number} completed\n   */\n\n\n  /**\n   * Handles changes to the Select component.\n   */\n\n\n  _createClass(DashboardProgressContainer, [{\n    key: 'render',\n\n\n    /**\n     * Renders the DashboardProgressContainer component.\n     */\n    value: function render() {\n      var classes = this.props.classes;\n\n\n      return _react2.default.createElement(\n        _reactstrap.Container,\n        { fluid: true, className: 'dashboard-page-progress-container' },\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '6' },\n            _react2.default.createElement(\n              'div',\n              { className: 'dashboard-page-progress-left' },\n              _react2.default.createElement(_reactChartjs.Doughnut, {\n                data: this.createData(this.props.uncompleted, this.props.completed),\n                height: 250\n              })\n            )\n          ),\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '6' },\n            _react2.default.createElement(\n              'div',\n              { className: 'dashboard-page-progress-right' },\n              _react2.default.createElement(\n                'div',\n                { className: 'dashboard-page-progress-header' },\n                'Your Progress'\n              ),\n              _react2.default.createElement(\n                'div',\n                { className: 'dashboard-page-progress-body' },\n                _react2.default.createElement(\n                  'div',\n                  { className: 'dashboard-page-progress-item' },\n                  _react2.default.createElement(\n                    'div',\n                    { style: { float: 'left' } },\n                    'Completed'\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { style: { float: 'right' } },\n                    this.getPercentage(this.props.completed)\n                  ),\n                  _react2.default.createElement('div', { style: { clear: 'both' } })\n                ),\n                _react2.default.createElement(\n                  'div',\n                  { className: 'dashboard-page-progress-item' },\n                  _react2.default.createElement(\n                    'div',\n                    { style: { float: 'left' } },\n                    'Uncompleted'\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { style: { float: 'right' } },\n                    this.getPercentage(this.props.uncompleted)\n                  ),\n                  _react2.default.createElement('div', { style: { clear: 'both' } })\n                ),\n                _react2.default.createElement(\n                  _core.FormControl,\n                  { className: classes.formControl },\n                  _react2.default.createElement(\n                    _core.Select,\n                    {\n                      value: this.state.selected,\n                      onChange: this.handleChange,\n                      name: 'selected',\n                      displayEmpty: true,\n                      className: classes.selectEmpty\n                    },\n                    _react2.default.createElement(\n                      _core.MenuItem,\n                      { value: '' },\n                      _react2.default.createElement(\n                        'em',\n                        null,\n                        'All'\n                      )\n                    ),\n                    categories.map(function (category, i) {\n                      return _react2.default.createElement(\n                        _core.MenuItem,\n                        { key: i, value: i },\n                        category\n                      );\n                    })\n                  )\n                )\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return DashboardProgressContainer;\n}(_react2.default.Component);\n\nDashboardProgressContainer.propTypes = {\n  uncompleted: _propTypes2.default.number,\n  completed: _propTypes2.default.number\n};\n\nexports.default = (0, _redux.compose)((0, _styles.withStyles)(materialUIStyles))(DashboardProgressContainer);\n\n//# sourceURL=webpack:///./components/DashboardPage/DashboardProgressContainer.jsx?");

/***/ }),

/***/ "./components/DashboardPage/index.js":
/*!*******************************************!*\
  !*** ./components/DashboardPage/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _DashboardPage = __webpack_require__(/*! ./DashboardPage */ \"./components/DashboardPage/DashboardPage.jsx\");\n\nvar _DashboardPage2 = _interopRequireDefault(_DashboardPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _DashboardPage2.default;\n\n//# sourceURL=webpack:///./components/DashboardPage/index.js?");

/***/ }),

/***/ "./components/Footer/Footer.jsx":
/*!**************************************!*\
  !*** ./components/Footer/Footer.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the Footer stateless functional component.\n *\n * @param {object} props\n */\nvar Footer = function Footer() {\n  return _react2.default.createElement(\n    'div',\n    { className: 'footer-container' },\n    _react2.default.createElement(\n      _reactstrap.Container,\n      { fluid: true },\n      _react2.default.createElement(\n        _reactstrap.Row,\n        null,\n        _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n        _react2.default.createElement(\n          _reactstrap.Col,\n          { md: '8' },\n          _react2.default.createElement(\n            _reactRouterDom.Link,\n            { className: 'footer-item footer-item-link', to: '/about' },\n            'About'\n          ),\n          _react2.default.createElement(\n            _reactRouterDom.Link,\n            { className: 'footer-item footer-item-link', to: '/terms-and-conditions' },\n            'Terms and Conditions'\n          ),\n          _react2.default.createElement(\n            _reactRouterDom.Link,\n            { className: 'footer-item footer-item-link', to: '/privacy-policy' },\n            'Privacy Policy'\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'footer-item' },\n            '\\xA9 2018 Algorithm Helper. All rights reserved.'\n          )\n        ),\n        _react2.default.createElement(_reactstrap.Col, { md: '2' })\n      )\n    )\n  );\n};\n\nFooter.propTypes = {};\n\nexports.default = Footer;\n\n//# sourceURL=webpack:///./components/Footer/Footer.jsx?");

/***/ }),

/***/ "./components/Footer/index.js":
/*!************************************!*\
  !*** ./components/Footer/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Footer = __webpack_require__(/*! ./Footer */ \"./components/Footer/Footer.jsx\");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Footer2.default;\n\n//# sourceURL=webpack:///./components/Footer/index.js?");

/***/ }),

/***/ "./components/InformationPage/InformationPage.jsx":
/*!********************************************************!*\
  !*** ./components/InformationPage/InformationPage.jsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _JumbotronMedium = __webpack_require__(/*! components/JumbotronMedium */ \"./components/JumbotronMedium/index.js\");\n\nvar _JumbotronMedium2 = _interopRequireDefault(_JumbotronMedium);\n\nvar _Markdown = __webpack_require__(/*! components/Markdown */ \"./components/Markdown/index.js\");\n\nvar _Markdown2 = _interopRequireDefault(_Markdown);\n\nvar _Footer = __webpack_require__(/*! components/Footer */ \"./components/Footer/index.js\");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _ColorThemeActions = __webpack_require__(/*! actions/ColorThemeActions */ \"./actions/ColorThemeActions.js\");\n\nvar _settings = __webpack_require__(/*! ./settings.json */ \"./components/InformationPage/settings.json\");\n\nvar _settings2 = _interopRequireDefault(_settings);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the InformationPage stateless functional component.\n *\n * @param {object} props\n */\nvar InformationPage = function InformationPage(props) {\n  props.dispatch((0, _ColorThemeActions.resetColorTheme)());\n\n  var _settings$props$infor = _settings2.default[props.informationKey],\n      title = _settings$props$infor.title,\n      url = _settings$props$infor.url;\n\n\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_JumbotronMedium2.default, { title: title }),\n    _react2.default.createElement(\n      _reactstrap.Container,\n      { className: 'information-page-markdown-container', fluid: true },\n      _react2.default.createElement(\n        _reactstrap.Row,\n        null,\n        _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n        _react2.default.createElement(\n          _reactstrap.Col,\n          { md: '8' },\n          _react2.default.createElement(_Markdown2.default, { url: url })\n        ),\n        _react2.default.createElement(_reactstrap.Col, { md: '2' })\n      )\n    ),\n    _react2.default.createElement(_Footer2.default, null)\n  );\n};\n\nInformationPage.propTypes = {\n  informationKey: _propTypes2.default.string\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(InformationPage);\n\n//# sourceURL=webpack:///./components/InformationPage/InformationPage.jsx?");

/***/ }),

/***/ "./components/InformationPage/index.js":
/*!*********************************************!*\
  !*** ./components/InformationPage/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _InformationPage = __webpack_require__(/*! ./InformationPage */ \"./components/InformationPage/InformationPage.jsx\");\n\nvar _InformationPage2 = _interopRequireDefault(_InformationPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _InformationPage2.default;\n\n//# sourceURL=webpack:///./components/InformationPage/index.js?");

/***/ }),

/***/ "./components/InformationPage/settings.json":
/*!**************************************************!*\
  !*** ./components/InformationPage/settings.json ***!
  \**************************************************/
/*! exports provided: about, terms-and-conditions, privacy-policy, default */
/***/ (function(module) {

eval("module.exports = {\"about\":{\"title\":\"About\",\"url\":\"https://s3.amazonaws.com/algorithm-helper/assets/information/about.md\"},\"terms-and-conditions\":{\"title\":\"Terms and Conditions\",\"url\":\"https://s3.amazonaws.com/algorithm-helper/assets/information/terms-and-conditions.md\"},\"privacy-policy\":{\"title\":\"Privacy Policy\",\"url\":\"https://s3.amazonaws.com/algorithm-helper/assets/information/privacy-policy.md\"}};\n\n//# sourceURL=webpack:///./components/InformationPage/settings.json?");

/***/ }),

/***/ "./components/JumbotronMedium/JumbotronMedium.jsx":
/*!********************************************************!*\
  !*** ./components/JumbotronMedium/JumbotronMedium.jsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _getColorFromKey = __webpack_require__(/*! ../../utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the JumbotronMedium stateless functional component.\n *\n * @param {object} props\n */\nvar JumbotronMedium = function JumbotronMedium(props) {\n  return _react2.default.createElement(\n    _reactstrap.Container,\n    { fluid: true },\n    _react2.default.createElement(\n      _reactstrap.Row,\n      {\n        className: 'jumbotron-md',\n        style: { backgroundColor: (0, _getColorFromKey2.default)(props.colorKey) }\n      },\n      _react2.default.createElement(\n        _reactstrap.Col,\n        { md: '12' },\n        _react2.default.createElement(\n          'div',\n          { className: 'jumbotron-md-text-container' },\n          _react2.default.createElement(\n            'div',\n            { className: 'jumbotron-md-title' },\n            props.title\n          )\n        )\n      )\n    )\n  );\n};\n\nJumbotronMedium.propTypes = {\n  title: _propTypes2.default.string\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps))(JumbotronMedium);\n\n//# sourceURL=webpack:///./components/JumbotronMedium/JumbotronMedium.jsx?");

/***/ }),

/***/ "./components/JumbotronMedium/index.js":
/*!*********************************************!*\
  !*** ./components/JumbotronMedium/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _JumbotronMedium = __webpack_require__(/*! ./JumbotronMedium */ \"./components/JumbotronMedium/JumbotronMedium.jsx\");\n\nvar _JumbotronMedium2 = _interopRequireDefault(_JumbotronMedium);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _JumbotronMedium2.default;\n\n//# sourceURL=webpack:///./components/JumbotronMedium/index.js?");

/***/ }),

/***/ "./components/JumbotronSmall/JumbotronSmall.jsx":
/*!******************************************************!*\
  !*** ./components/JumbotronSmall/JumbotronSmall.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _getColorFromKey = __webpack_require__(/*! ../../utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the JumbotronSmall stateless functional component.\n *\n * @param {object} props\n */\nvar JumbotronSmall = function JumbotronSmall(props) {\n  return _react2.default.createElement(\n    _reactstrap.Container,\n    { fluid: true },\n    _react2.default.createElement(\n      _reactstrap.Row,\n      {\n        className: 'jumbotron-sm',\n        style: { backgroundColor: (0, _getColorFromKey2.default)(props.colorKey) }\n      },\n      _react2.default.createElement(\n        _reactstrap.Col,\n        { md: '12' },\n        _react2.default.createElement(\n          'div',\n          { className: 'jumbotron-sm-text-container' },\n          _react2.default.createElement(\n            'div',\n            { className: 'jumbotron-sm-title' },\n            props.title\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'jumbotron-sm-subtitle' },\n            _react2.default.createElement(\n              _reactRouterDom.Link,\n              { to: props.urlKey },\n              props.subtitle && String.fromCharCode(0x02190) + ' ' + props.subtitle\n            )\n          )\n        )\n      )\n    )\n  );\n};\n\nJumbotronSmall.propTypes = {\n  title: _propTypes2.default.string,\n  subtitle: _propTypes2.default.string,\n  urlKey: _propTypes2.default.string\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(JumbotronSmall);\n\n//# sourceURL=webpack:///./components/JumbotronSmall/JumbotronSmall.jsx?");

/***/ }),

/***/ "./components/JumbotronSmall/index.js":
/*!********************************************!*\
  !*** ./components/JumbotronSmall/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _JumbotronSmall = __webpack_require__(/*! ./JumbotronSmall */ \"./components/JumbotronSmall/JumbotronSmall.jsx\");\n\nvar _JumbotronSmall2 = _interopRequireDefault(_JumbotronSmall);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _JumbotronSmall2.default;\n\n//# sourceURL=webpack:///./components/JumbotronSmall/index.js?");

/***/ }),

/***/ "./components/LoginPage/LoginPage.jsx":
/*!********************************************!*\
  !*** ./components/LoginPage/LoginPage.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _Logo = __webpack_require__(/*! components/Logo */ \"./components/Logo/index.js\");\n\nvar _Logo2 = _interopRequireDefault(_Logo);\n\nvar _ColorThemeActions = __webpack_require__(/*! actions/ColorThemeActions */ \"./actions/ColorThemeActions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar LoginPage = function (_React$Component) {\n  _inherits(LoginPage, _React$Component);\n\n  function LoginPage(props) {\n    _classCallCheck(this, LoginPage);\n\n    var _this = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));\n\n    _this.handleLoginClicked = function () {\n      try {\n        _this.setState({\n          isEmailError: false,\n          isPasswordError: false,\n          serverError: ''\n        });\n        _this.validateFields();\n\n        if (!_this.state.isWaitingResponse) {\n          _this.setState({ isWaitingResponse: true });\n          _this.requestLogin();\n        }\n      } catch (errors) {\n        errors.forEach(function (error) {\n          _this.setState(_defineProperty({}, error.type, true));\n        });\n      }\n    };\n\n    _this.requestLogin = function () {\n      fetch('/accounts/login', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          email: _this.state.fieldEmail,\n          password: _this.state.fieldPassword\n        })\n      }).then(function (result) {\n        return result.json();\n      }).then(function (result) {\n        if (result.error) {\n          throw result;\n        }\n\n        _this.setState({ success: true, isWaitingResponse: false });\n      }).catch(function () {\n        _this.setState({\n          serverError: 'Invalid login credentials.',\n          isWaitingResponse: false\n        });\n      });\n    };\n\n    _this.validateFields = function () {\n      var errors = [];\n\n      var email = _this.state.fieldEmail.trim();\n      if (email.length === 0) {\n        var error = new Error('`email` field must not be empty.');\n        error.type = 'isEmailError';\n        errors.push(error);\n      }\n\n      var password = _this.state.fieldPassword.trim();\n      if (password.length === 0) {\n        var _error = new Error('`password` field must not be empty.');\n        _error.type = 'isPasswordError';\n        errors.push(_error);\n      }\n\n      if (errors.length > 0) {\n        throw errors;\n      }\n    };\n\n    _this.handleFieldChanged = function (e, fieldKey) {\n      var text = e.target.value.trim();\n      _this.setState(_defineProperty({}, fieldKey, text));\n    };\n\n    _this.state = {\n      fieldEmail: '',\n      fieldPassword: '',\n      isEmailError: false,\n      isPasswordError: false,\n      serverError: '',\n      isWaitingResponse: false,\n      success: false\n    };\n    return _this;\n  }\n\n  _createClass(LoginPage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.props.dispatch((0, _ColorThemeActions.resetColorTheme)());\n    }\n\n    /**\n     * Handles submitting with the given login information.\n     */\n\n\n    /**\n     * Makes POST request to server to attempt to login with the given user credentials.\n     */\n\n\n    /**\n     * Validates the input fields, and throws list of errors if any are invalid.\n     */\n\n\n    /**\n     * Handles the change the field with the given key.\n     *\n     * @param {Event} e\n     * @param {string} fieldKey\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the LoginPage component.\n     */\n    value: function render() {\n      var _this2 = this;\n\n      if (this.state.success) {\n        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/dashboard' });\n      }\n\n      return _react2.default.createElement(\n        _reactstrap.Container,\n        { fluid: true },\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '8' },\n            _react2.default.createElement(\n              'div',\n              { className: 'mx-auto login-page-card-container' },\n              _react2.default.createElement(\n                _reactstrap.Card,\n                { className: 'login-page-card' },\n                _react2.default.createElement(\n                  _reactstrap.CardBody,\n                  null,\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'login-page-logo-container' },\n                    _react2.default.createElement(_Logo2.default, {\n                      width: '100px',\n                      height: '100px',\n                      dark: true\n                    })\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'login-page-title' },\n                    'Login To Your Account'\n                  ),\n                  this.state.serverError && _react2.default.createElement(\n                    'div',\n                    { className: 'login-page-server-error' },\n                    this.state.serverError\n                  ),\n                  _react2.default.createElement(\n                    _reactstrap.Form,\n                    { className: 'login-page-form' },\n                    _react2.default.createElement(\n                      _reactstrap.FormGroup,\n                      null,\n                      _react2.default.createElement('i', { className: 'fa fa-envelope prefix grey-text' }),\n                      _react2.default.createElement(\n                        'label',\n                        { htmlFor: 'login-page-email', className: 'login-page-label' },\n                        'Email'\n                      ),\n                      _react2.default.createElement(\n                        _reactstrap.InputGroup,\n                        null,\n                        _react2.default.createElement(_reactstrap.Input, {\n                          className: 'login-page-input',\n                          type: 'email',\n                          id: 'login-page-email',\n                          autoComplete: 'off',\n                          onChange: function onChange(e) {\n                            return _this2.handleFieldChanged(e, 'fieldEmail');\n                          }\n                        })\n                      ),\n                      this.state.isEmailError && _react2.default.createElement(\n                        'div',\n                        { className: 'login-page-input-error' },\n                        'Cannot be empty.'\n                      )\n                    ),\n                    _react2.default.createElement(\n                      _reactstrap.FormGroup,\n                      null,\n                      _react2.default.createElement('i', { className: 'fa fa-lock prefix grey-text' }),\n                      _react2.default.createElement(\n                        'label',\n                        { htmlFor: 'login-page-password', className: 'login-page-label' },\n                        'Password'\n                      ),\n                      _react2.default.createElement(\n                        _reactstrap.InputGroup,\n                        null,\n                        _react2.default.createElement(_reactstrap.Input, {\n                          className: 'login-page-input',\n                          type: 'password',\n                          id: 'login-page-password',\n                          autoComplete: 'off',\n                          onChange: function onChange(e) {\n                            return _this2.handleFieldChanged(e, 'fieldPassword');\n                          }\n                        })\n                      ),\n                      this.state.isPasswordError && _react2.default.createElement(\n                        'div',\n                        { className: 'login-page-input-error' },\n                        'Cannot be empty.'\n                      )\n                    )\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'login-page-btn-login-container' },\n                    _react2.default.createElement(\n                      _reactstrap.Button,\n                      {\n                        className: 'login-page-btn-login',\n                        color: 'primary',\n                        onClick: this.handleLoginClicked\n                      },\n                      'Login'\n                    )\n                  )\n                )\n              )\n            )\n          ),\n          _react2.default.createElement(_reactstrap.Col, { md: '2' })\n        )\n      );\n    }\n  }]);\n\n  return LoginPage;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(LoginPage);\n\n//# sourceURL=webpack:///./components/LoginPage/LoginPage.jsx?");

/***/ }),

/***/ "./components/LoginPage/LoginPageContainer.jsx":
/*!*****************************************************!*\
  !*** ./components/LoginPage/LoginPageContainer.jsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Particles = __webpack_require__(/*! components/Particles */ \"./components/Particles/index.js\");\n\nvar _Particles2 = _interopRequireDefault(_Particles);\n\nvar _LoginPage = __webpack_require__(/*! ./LoginPage */ \"./components/LoginPage/LoginPage.jsx\");\n\nvar _LoginPage2 = _interopRequireDefault(_LoginPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar LoginPageContainer = function LoginPageContainer() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_Particles2.default, null),\n    _react2.default.createElement(_LoginPage2.default, null)\n  );\n};\n\nexports.default = LoginPageContainer;\n\n//# sourceURL=webpack:///./components/LoginPage/LoginPageContainer.jsx?");

/***/ }),

/***/ "./components/LoginPage/index.js":
/*!***************************************!*\
  !*** ./components/LoginPage/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _LoginPageContainer = __webpack_require__(/*! ./LoginPageContainer */ \"./components/LoginPage/LoginPageContainer.jsx\");\n\nvar _LoginPageContainer2 = _interopRequireDefault(_LoginPageContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _LoginPageContainer2.default;\n\n//# sourceURL=webpack:///./components/LoginPage/index.js?");

/***/ }),

/***/ "./components/Logo/Logo.jsx":
/*!**********************************!*\
  !*** ./components/Logo/Logo.jsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _logoSettings = __webpack_require__(/*! ./logoSettings.json */ \"./components/Logo/logoSettings.json\");\n\nvar _logoSettings2 = _interopRequireDefault(_logoSettings);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the Logo stateless functional component.\n *\n * @param {object} props\n */\nvar Logo = function Logo(props) {\n  var src = void 0;\n  if (props.dark) {\n    src = _logoSettings2.default.dark;\n  }\n\n  if (props.light) {\n    src = _logoSettings2.default.light;\n  }\n\n  return _react2.default.createElement('img', {\n    className: 'logo',\n    src: src,\n    style: {\n      width: props.width || 100,\n      height: props.height || 100\n    },\n    alt: _logoSettings2.default.alt\n  });\n};\n\nLogo.propTypes = {\n  height: _propTypes2.default.string,\n  width: _propTypes2.default.string,\n  dark: _propTypes2.default.bool,\n  light: _propTypes2.default.bool\n};\n\nexports.default = Logo;\n\n//# sourceURL=webpack:///./components/Logo/Logo.jsx?");

/***/ }),

/***/ "./components/Logo/index.js":
/*!**********************************!*\
  !*** ./components/Logo/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Logo = __webpack_require__(/*! ./Logo */ \"./components/Logo/Logo.jsx\");\n\nvar _Logo2 = _interopRequireDefault(_Logo);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Logo2.default;\n\n//# sourceURL=webpack:///./components/Logo/index.js?");

/***/ }),

/***/ "./components/Logo/logoSettings.json":
/*!*******************************************!*\
  !*** ./components/Logo/logoSettings.json ***!
  \*******************************************/
/*! exports provided: dark, light, alt, default */
/***/ (function(module) {

eval("module.exports = {\"dark\":\"https://s3.amazonaws.com/algorithm-helper/assets/img/logo/logo-dark.png\",\"light\":\"https://s3.amazonaws.com/algorithm-helper/assets/img/logo/logo-light.png\",\"alt\":\"Algorithm Helper Logo\"};\n\n//# sourceURL=webpack:///./components/Logo/logoSettings.json?");

/***/ }),

/***/ "./components/MainPage/MainArea.jsx":
/*!******************************************!*\
  !*** ./components/MainPage/MainArea.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactMdSpinner = __webpack_require__(/*! react-md-spinner */ \"react-md-spinner\");\n\nvar _reactMdSpinner2 = _interopRequireDefault(_reactMdSpinner);\n\nvar _MainAreaSearchBar = __webpack_require__(/*! ./MainAreaSearchBar */ \"./components/MainPage/MainAreaSearchBar.jsx\");\n\nvar _MainAreaSearchBar2 = _interopRequireDefault(_MainAreaSearchBar);\n\nvar _MainAreaCardContainer = __webpack_require__(/*! ./MainAreaCardContainer */ \"./components/MainPage/MainAreaCardContainer.jsx\");\n\nvar _MainAreaCardContainer2 = _interopRequireDefault(_MainAreaCardContainer);\n\nvar _MainAreaNoResults = __webpack_require__(/*! ./MainAreaNoResults */ \"./components/MainPage/MainAreaNoResults.jsx\");\n\nvar _MainAreaNoResults2 = _interopRequireDefault(_MainAreaNoResults);\n\nvar _getColorFromKey = __webpack_require__(/*! ../../utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MainArea = function (_React$Component) {\n  _inherits(MainArea, _React$Component);\n\n  function MainArea(props) {\n    _classCallCheck(this, MainArea);\n\n    var _this = _possibleConstructorReturn(this, (MainArea.__proto__ || Object.getPrototypeOf(MainArea)).call(this, props));\n\n    _this.handleSearchChange = function (e) {\n      var searchQuery = e.target.value.trim().replace(/\\s/g, '').toLowerCase();\n\n      // Get visible cards based on the search query:\n      var visibleCards = _this.state.cardData.filter(function (card) {\n        return card.title.trim().replace(/\\s/g, '').toLowerCase().includes(searchQuery) || card.description.trim().replace(/\\s/g, '').toLowerCase().includes(searchQuery);\n      });\n\n      _this.setState({ visibleCards: visibleCards });\n    };\n\n    _this.getEmptyItemsComponent = function () {\n      var component = void 0;\n      if (_this.state.loading) {\n        component = _react2.default.createElement(\n          'div',\n          { className: 'main-area-spinner-container' },\n          _react2.default.createElement(_reactMdSpinner2.default, {\n            size: 50,\n            singleColor: (0, _getColorFromKey2.default)(_this.props.colorKey)\n          })\n        );\n      } else {\n        component = _react2.default.createElement(_MainAreaNoResults2.default, {\n          title: 'No results found.',\n          subtitle: 'Try a different search term.'\n        });\n      }\n      return component;\n    };\n\n    _this.state = {\n      cardData: [],\n      visibleCards: [],\n      loading: true\n    };\n    return _this;\n  }\n\n  _createClass(MainArea, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.setState({\n        cardData: this.props.cardData,\n        visibleCards: this.props.cardData,\n        loading: this.props.loading\n      });\n    }\n  }, {\n    key: 'componentWillReceiveProps',\n    value: function componentWillReceiveProps(newProps) {\n      this.setState({\n        cardData: newProps.cardData,\n        visibleCards: newProps.cardData,\n        loading: newProps.loading\n      });\n    }\n\n    /**\n     * Normalizes the search query and filters the visibleCards.\n     *\n     * @param {Event} e\n     */\n\n\n    /**\n     * Gets the empty items component (component to show when either the card data is loading or\n     * when the search query yields no result).\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the MainArea component.\n     */\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        { className: 'main-area-container' },\n        _react2.default.createElement(_MainAreaSearchBar2.default, {\n          onSearchChange: this.handleSearchChange,\n          searchPlaceholder: 'Search for a topic...'\n        }),\n        this.state.visibleCards.length > 0 ? _react2.default.createElement(_MainAreaCardContainer2.default, {\n          cardData: this.state.visibleCards\n        }) : this.getEmptyItemsComponent()\n      );\n    }\n  }]);\n\n  return MainArea;\n}(_react2.default.Component);\n\nMainArea.propTypes = {\n  cardData: _propTypes2.default.array,\n  loading: _propTypes2.default.bool\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(MainArea);\n\n//# sourceURL=webpack:///./components/MainPage/MainArea.jsx?");

/***/ }),

/***/ "./components/MainPage/MainAreaCard.jsx":
/*!**********************************************!*\
  !*** ./components/MainPage/MainAreaCard.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _getColorFromKey = __webpack_require__(/*! ../../utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the MainAreaCard stateless functional component.\n *\n * @param {object} props\n */\nvar MainAreaCard = function MainAreaCard(props) {\n  return _react2.default.createElement(\n    _reactstrap.Card,\n    {\n      className: 'main-area-card',\n      style: {\n        backgroundColor: (0, _getColorFromKey2.default)(props.colorKey),\n        borderColor: (0, _getColorFromKey2.default)(props.colorKey),\n        backgroundImage: 'url(' + props.imageUrl + ')'\n      }\n    },\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { className: 'main-area-card-link', to: props.url },\n      _react2.default.createElement(\n        _reactstrap.CardBody,\n        null,\n        _react2.default.createElement(\n          _reactstrap.CardTitle,\n          { className: 'main-area-card-title' },\n          props.title\n        ),\n        _react2.default.createElement(_reactstrap.CardSubtitle, { className: 'main-area-card-subtitle' })\n      ),\n      _react2.default.createElement(\n        _reactstrap.CardBody,\n        { className: 'main-area-card-body-bottom' },\n        _react2.default.createElement(\n          _reactstrap.CardText,\n          { className: 'main-area-card-description' },\n          props.description\n        )\n      )\n    )\n  );\n};\n\nMainAreaCard.propTypes = {\n  colorKey: _propTypes2.default.number,\n  imageUrl: _propTypes2.default.string,\n  url: _propTypes2.default.string,\n  title: _propTypes2.default.string,\n  description: _propTypes2.default.string\n};\n\nexports.default = MainAreaCard;\n\n//# sourceURL=webpack:///./components/MainPage/MainAreaCard.jsx?");

/***/ }),

/***/ "./components/MainPage/MainAreaCardContainer.jsx":
/*!*******************************************************!*\
  !*** ./components/MainPage/MainAreaCardContainer.jsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _MainAreaCard = __webpack_require__(/*! ./MainAreaCard */ \"./components/MainPage/MainAreaCard.jsx\");\n\nvar _MainAreaCard2 = _interopRequireDefault(_MainAreaCard);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the MainAreaCardContainer stateless functional component.\n *\n * @param {object} props\n */\nvar MainAreaCardContainer = function MainAreaCardContainer(props) {\n  return _react2.default.createElement(\n    'div',\n    { className: 'main-area-card-container' },\n    _react2.default.createElement(\n      _reactstrap.Container,\n      { fluid: true },\n      _react2.default.createElement(\n        _reactstrap.Row,\n        null,\n        _react2.default.createElement(_reactstrap.Col, { md: '1' }),\n        _react2.default.createElement(\n          _reactstrap.Col,\n          { md: '10' },\n          _react2.default.createElement(\n            _reactstrap.Row,\n            null,\n            props.cardData.map(function (card, i) {\n              return _react2.default.createElement(\n                _reactstrap.Col,\n                { key: i, md: '4' },\n                _react2.default.createElement(_MainAreaCard2.default, {\n                  colorKey: card.colorKey,\n                  imageUrl: card.imageUrl,\n                  url: card.url,\n                  title: card.title,\n                  description: card.description\n                })\n              );\n            })\n          )\n        ),\n        _react2.default.createElement(_reactstrap.Col, { md: '1' })\n      )\n    )\n  );\n};\n\nMainAreaCardContainer.propTypes = {\n  cardData: _propTypes2.default.array\n};\n\nexports.default = MainAreaCardContainer;\n\n//# sourceURL=webpack:///./components/MainPage/MainAreaCardContainer.jsx?");

/***/ }),

/***/ "./components/MainPage/MainAreaNoResults.jsx":
/*!***************************************************!*\
  !*** ./components/MainPage/MainAreaNoResults.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the MainAreaNoResults stateless functional component.\n *\n * @param {object} props\n */\nvar MainAreaNoResults = function MainAreaNoResults(props) {\n  return _react2.default.createElement(\n    'div',\n    { className: 'main-area-no-results-container' },\n    _react2.default.createElement(\n      'div',\n      { className: 'main-area-no-results-title' },\n      props.title\n    ),\n    _react2.default.createElement(\n      'div',\n      { className: 'main-area-no-results-subtitle' },\n      props.subtitle\n    )\n  );\n};\n\nMainAreaNoResults.propTypes = {\n  title: _propTypes2.default.string,\n  subtitle: _propTypes2.default.string\n};\n\nexports.default = MainAreaNoResults;\n\n//# sourceURL=webpack:///./components/MainPage/MainAreaNoResults.jsx?");

/***/ }),

/***/ "./components/MainPage/MainAreaSearchBar.jsx":
/*!***************************************************!*\
  !*** ./components/MainPage/MainAreaSearchBar.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the MainAreaSearchBar stateless functional component.\n *\n * @param {object} props\n */\nvar MainAreaSearchBar = function MainAreaSearchBar(props) {\n  return _react2.default.createElement(\n    _reactstrap.Container,\n    { className: 'main-area-search-bar', fluid: true },\n    _react2.default.createElement(\n      _reactstrap.Row,\n      null,\n      _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n      _react2.default.createElement(\n        _reactstrap.Col,\n        { md: '8' },\n        _react2.default.createElement(\n          _reactstrap.InputGroup,\n          null,\n          _react2.default.createElement(_reactstrap.Input, {\n            type: 'text',\n            className: 'main-area-search-bar',\n            placeholder: props.searchPlaceholder,\n            onChange: props.onSearchChange,\n            autoComplete: 'off'\n          })\n        )\n      ),\n      _react2.default.createElement(_reactstrap.Col, { md: '2' })\n    )\n  );\n};\n\nMainAreaSearchBar.propTypes = {\n  onSearchChange: _propTypes2.default.func,\n  searchPlaceholder: _propTypes2.default.string\n};\n\nexports.default = MainAreaSearchBar;\n\n//# sourceURL=webpack:///./components/MainPage/MainAreaSearchBar.jsx?");

/***/ }),

/***/ "./components/MainPage/MainPage.js":
/*!*****************************************!*\
  !*** ./components/MainPage/MainPage.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _MainPageJumbotron = __webpack_require__(/*! ./MainPageJumbotron */ \"./components/MainPage/MainPageJumbotron.jsx\");\n\nvar _MainPageJumbotron2 = _interopRequireDefault(_MainPageJumbotron);\n\nvar _MainArea = __webpack_require__(/*! ./MainArea */ \"./components/MainPage/MainArea.jsx\");\n\nvar _MainArea2 = _interopRequireDefault(_MainArea);\n\nvar _Footer = __webpack_require__(/*! ../Footer/ */ \"./components/Footer/index.js\");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _ColorThemeActions = __webpack_require__(/*! ../../actions/ColorThemeActions */ \"./actions/ColorThemeActions.js\");\n\nvar _utils = __webpack_require__(/*! ../../utils/utils */ \"./utils/utils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MainPage = function (_React$Component) {\n  _inherits(MainPage, _React$Component);\n\n  function MainPage(props) {\n    _classCallCheck(this, MainPage);\n\n    var _this = _possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, props));\n\n    _this.state = {\n      cardData: [],\n      loading: true\n    };\n    return _this;\n  }\n\n  _createClass(MainPage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.props.dispatch((0, _ColorThemeActions.resetColorTheme)());\n      this.requestSubcategoryData();\n    }\n\n    /**\n     * Makes a request to the server to get the Subcategories data, as well as the Categories\n     * color mapping between keys to colorKey's.\n     */\n\n  }, {\n    key: 'requestSubcategoryData',\n    value: function requestSubcategoryData() {\n      var _this2 = this;\n\n      Promise.all([fetch('/data/subcategories'), fetch('/data/utils/categories-color-key-mapping')]).then(function (result) {\n        return Promise.all(result.map(function (x) {\n          return x.json();\n        }));\n      }).then(function (result) {\n        var _result = _slicedToArray(result, 2),\n            subcategories = _result[0],\n            colorKeyMapping = _result[1];\n\n        var cardData = [];\n        subcategories.data.forEach(function (subcategory) {\n          var key = subcategory.key,\n              title = subcategory.title,\n              description = subcategory.description,\n              imageUrl = subcategory.imageUrl,\n              parent = subcategory.parent;\n\n          var url = '/categories/' + key;\n          var colorKey = colorKeyMapping.data[parent];\n          cardData.push({ title: title, description: description, imageUrl: imageUrl, colorKey: colorKey, url: url });\n        });\n\n        _this2.setState({ cardData: cardData, loading: false });\n      }).catch(_utils.noop);\n    }\n\n    /**\n     * Renders the MainPage component.\n     */\n\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        { className: 'main-page-container' },\n        _react2.default.createElement(_MainPageJumbotron2.default, {\n          title: 'Learn about algorithms and data structures.',\n          subtitle: 'Algorithm Helper is an educational resource for learning about algorithms, ' + 'data structures, and software engineering topics.'\n        }),\n        _react2.default.createElement(_MainArea2.default, {\n          cardData: this.state.cardData,\n          loading: this.state.loading\n        }),\n        _react2.default.createElement(_Footer2.default, null)\n      );\n    }\n  }]);\n\n  return MainPage;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(MainPage);\n\n//# sourceURL=webpack:///./components/MainPage/MainPage.js?");

/***/ }),

/***/ "./components/MainPage/MainPageJumbotron.jsx":
/*!***************************************************!*\
  !*** ./components/MainPage/MainPageJumbotron.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _Particles = __webpack_require__(/*! ./Particles */ \"./components/MainPage/Particles.jsx\");\n\nvar _Particles2 = _interopRequireDefault(_Particles);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the MainPageJumbotron stateless functional component.\n *\n * @param {object} props\n */\nvar MainPageJumbotron = function MainPageJumbotron(props) {\n  return _react2.default.createElement(\n    'div',\n    { className: 'main-page-jumbotron' },\n    _react2.default.createElement(\n      'div',\n      { className: 'main-page-jumbotron-text-container' },\n      _react2.default.createElement(\n        'div',\n        { className: 'main-page-jumbotron-title' },\n        props.title\n      ),\n      _react2.default.createElement(\n        'div',\n        { className: 'main-page-jumbotron-subtitle' },\n        props.subtitle\n      )\n    ),\n    _react2.default.createElement(_Particles2.default, null)\n  );\n};\n\nMainPageJumbotron.propTypes = {\n  title: _propTypes2.default.string,\n  subtitle: _propTypes2.default.string\n};\n\nexports.default = MainPageJumbotron;\n\n//# sourceURL=webpack:///./components/MainPage/MainPageJumbotron.jsx?");

/***/ }),

/***/ "./components/MainPage/Particles.jsx":
/*!*******************************************!*\
  !*** ./components/MainPage/Particles.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactParticlesJs = __webpack_require__(/*! react-particles-js */ \"react-particles-js\");\n\nvar _reactParticlesJs2 = _interopRequireDefault(_reactParticlesJs);\n\nvar _particlesSettings = __webpack_require__(/*! ./particlesSettings.json */ \"./components/MainPage/particlesSettings.json\");\n\nvar _particlesSettings2 = _interopRequireDefault(_particlesSettings);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the Particles stateless functional component.\n *\n * @param {object} props\n */\nvar Particles = function Particles() {\n  return _react2.default.createElement(_reactParticlesJs2.default, {\n    params: _particlesSettings2.default,\n    className: 'main-page-particle-bg'\n  });\n};\n\nParticles.propTypes = {};\n\nexports.default = Particles;\n\n//# sourceURL=webpack:///./components/MainPage/Particles.jsx?");

/***/ }),

/***/ "./components/MainPage/index.js":
/*!**************************************!*\
  !*** ./components/MainPage/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _MainPage = __webpack_require__(/*! ./MainPage */ \"./components/MainPage/MainPage.js\");\n\nvar _MainPage2 = _interopRequireDefault(_MainPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _MainPage2.default;\n\n//# sourceURL=webpack:///./components/MainPage/index.js?");

/***/ }),

/***/ "./components/MainPage/particlesSettings.json":
/*!****************************************************!*\
  !*** ./components/MainPage/particlesSettings.json ***!
  \****************************************************/
/*! exports provided: particles, retina_detect, default */
/***/ (function(module) {

eval("module.exports = {\"particles\":{\"number\":{\"value\":25,\"density\":{\"enable\":true,\"value_area\":2000}},\"color\":{\"value\":\"#fff\"},\"opacity\":{\"value\":0.5,\"random\":false,\"anim\":{\"enable\":false,\"speed\":1,\"opacity_min\":0.1,\"sync\":false}},\"size\":{\"value\":1,\"random\":true,\"anim\":{\"enable\":false,\"speed\":80,\"size_min\":0.1,\"sync\":false}},\"line_linked\":{\"enable\":true,\"distance\":250,\"color\":\"#fff\",\"opacity\":0.4,\"width\":1},\"move\":{\"enable\":true,\"speed\":6,\"direction\":\"none\",\"random\":true,\"straight\":false,\"out_mode\":\"out\",\"bounce\":false,\"attract\":{\"enable\":false,\"rotateX\":600,\"rotateY\":1200}}},\"retina_detect\":true};\n\n//# sourceURL=webpack:///./components/MainPage/particlesSettings.json?");

/***/ }),

/***/ "./components/Markdown/Markdown.jsx":
/*!******************************************!*\
  !*** ./components/Markdown/Markdown.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _marked = __webpack_require__(/*! marked */ \"marked\");\n\nvar _marked2 = _interopRequireDefault(_marked);\n\nvar _katexOptions = __webpack_require__(/*! ./katexOptions */ \"./components/Markdown/katexOptions.js\");\n\nvar _katexOptions2 = _interopRequireDefault(_katexOptions);\n\nvar _markedOptions = __webpack_require__(/*! ./markedOptions */ \"./components/Markdown/markedOptions.js\");\n\nvar _markedOptions2 = _interopRequireDefault(_markedOptions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Markdown = function (_React$Component) {\n  _inherits(Markdown, _React$Component);\n\n  function Markdown(props) {\n    _classCallCheck(this, Markdown);\n\n    var _this = _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this, props));\n\n    _this.state = {\n      markdownContent: ''\n    };\n    return _this;\n  }\n\n  _createClass(Markdown, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      var _this2 = this;\n\n      _marked2.default.setOptions(_markedOptions2.default);\n\n      if (this.props.url) {\n        fetch(this.props.url, {\n          method: 'GET'\n        }).then(function (result) {\n          return result.text();\n        }).then(function (result) {\n          _this2.setState({ markdownContent: (0, _marked2.default)(result) });\n\n          if (_this2.props.onLoaded) {\n            _this2.props.onLoaded();\n          }\n        }).catch(function () {});\n      } else if (this.props.markdownStr) {\n        this.setState({ markdownContent: (0, _marked2.default)(this.props.markdownStr) });\n\n        if (this.props.onLoaded) {\n          this.props.onLoaded();\n        }\n      }\n    }\n  }, {\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate() {\n      window.renderMathInElement(document.body, _katexOptions2.default);\n    }\n\n    /**\n     * Renders the Markdown component.\n     */\n\n  }, {\n    key: 'render',\n    value: function render() {\n      /* eslint-disable react/no-danger */\n      return _react2.default.createElement(\n        'div',\n        { className: 'markdown-container' },\n        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.markdownContent } })\n      );\n    }\n  }]);\n\n  return Markdown;\n}(_react2.default.Component);\n\nMarkdown.propTypes = {\n  url: _propTypes2.default.string,\n  markdownStr: _propTypes2.default.string,\n  onLoaded: _propTypes2.default.func\n};\n\nexports.default = Markdown;\n\n//# sourceURL=webpack:///./components/Markdown/Markdown.jsx?");

/***/ }),

/***/ "./components/Markdown/index.js":
/*!**************************************!*\
  !*** ./components/Markdown/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Markdown = __webpack_require__(/*! ./Markdown */ \"./components/Markdown/Markdown.jsx\");\n\nvar _Markdown2 = _interopRequireDefault(_Markdown);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Markdown2.default;\n\n//# sourceURL=webpack:///./components/Markdown/index.js?");

/***/ }),

/***/ "./components/Markdown/katexOptions.js":
/*!*********************************************!*\
  !*** ./components/Markdown/katexOptions.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar options = {\n  delimiters: [{\n    left: '$$',\n    right: '$$',\n    display: true\n  }, {\n    left: '\\\\[',\n    right: '\\\\]',\n    display: true\n  }, {\n    left: '$',\n    right: '$',\n    display: false\n  }, {\n    left: '\\\\(',\n    right: '\\\\)',\n    display: false\n  }]\n};\n\nexports.default = options;\n\n//# sourceURL=webpack:///./components/Markdown/katexOptions.js?");

/***/ }),

/***/ "./components/Markdown/markedOptions.js":
/*!**********************************************!*\
  !*** ./components/Markdown/markedOptions.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _marked = __webpack_require__(/*! marked */ \"marked\");\n\nvar _marked2 = _interopRequireDefault(_marked);\n\nvar _highlight = __webpack_require__(/*! highlight.js */ \"highlight.js\");\n\nvar _highlight2 = _interopRequireDefault(_highlight);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar renderer = new _marked2.default.Renderer();\nrenderer.code = function (code, language) {\n  var validLang = !!(language && _highlight2.default.getLanguage(language));\n  var highlighted = validLang ? _highlight2.default.highlight(language, code).value : code;\n  return '<pre><code class=\"hljs ' + language + '\">' + highlighted + '</code></pre>';\n};\n\nvar options = {\n  renderer: renderer,\n  pedantic: false,\n  gfm: true,\n  tables: false,\n  breaks: false,\n  sanitize: false,\n  smartLists: true,\n  smartypants: false,\n  xhtml: false\n};\n\nexports.default = options;\n\n//# sourceURL=webpack:///./components/Markdown/markedOptions.js?");

/***/ }),

/***/ "./components/NavBar/NavBar.jsx":
/*!**************************************!*\
  !*** ./components/NavBar/NavBar.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _color = __webpack_require__(/*! color */ \"color\");\n\nvar _color2 = _interopRequireDefault(_color);\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _Logo = __webpack_require__(/*! components/Logo */ \"./components/Logo/index.js\");\n\nvar _Logo2 = _interopRequireDefault(_Logo);\n\nvar _getColorFromKey = __webpack_require__(/*! ../../utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar NavBar = function (_React$Component) {\n  _inherits(NavBar, _React$Component);\n\n  function NavBar(props) {\n    _classCallCheck(this, NavBar);\n\n    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));\n\n    _this.toggle = function () {\n      _this.setState({\n        isOpen: !_this.state.isOpen\n      });\n    };\n\n    _this.onSearchChange = function (e) {\n      var searchQuery = e.target.value.trim();\n      _this.setState({ searchQuery: searchQuery });\n    };\n\n    _this.getLightenedColorTheme = function () {\n      var currentColor = (0, _getColorFromKey2.default)(_this.props.colorKey);\n      return (0, _color2.default)(currentColor).lighten(0.15).hex();\n    };\n\n    _this.state = {\n      isOpen: false,\n      searchQuery: ''\n    };\n    return _this;\n  }\n\n  /**\n   * Toggles the NavItems.\n   */\n\n\n  /**\n   * Handler for changes in the NavBar search field.\n   *\n   * @param {Event} e\n   */\n\n\n  /**\n   * Returns a lighter version of the current color theme using the `color` library. Used for making\n   * the background color of the search bar slightly lighter.\n   */\n\n\n  _createClass(NavBar, [{\n    key: 'render',\n\n\n    /**\n     * Renders the NavBar component.\n     */\n    value: function render() {\n      console.log(this.state.searchQuery);\n      return _react2.default.createElement(\n        _reactstrap.Navbar,\n        {\n          fixed: 'top',\n          className: 'navbar-main',\n          dark: true,\n          expand: 'md',\n          style: { backgroundColor: (0, _getColorFromKey2.default)(this.props.colorKey) }\n        },\n        _react2.default.createElement(\n          _reactstrap.NavbarBrand,\n          { className: 'navbar-brand-title', tag: _reactRouterDom.Link, to: '/' },\n          _react2.default.createElement(\n            'div',\n            { className: 'navbar-logo-container' },\n            _react2.default.createElement(_Logo2.default, {\n              height: '40px',\n              width: '40px',\n              light: true\n            })\n          ),\n          'Algorithm Helper'\n        ),\n        _react2.default.createElement(_reactstrap.NavbarToggler, { onClick: this.toggle }),\n        _react2.default.createElement(\n          _reactstrap.Collapse,\n          {\n            isOpen: this.state.isOpen,\n            navbar: true,\n            style: { backgroundColor: (0, _getColorFromKey2.default)(this.props.colorKey) }\n          },\n          _react2.default.createElement(\n            _reactstrap.Nav,\n            { className: 'ml-auto', navbar: true },\n            _react2.default.createElement(\n              _reactstrap.NavItem,\n              null,\n              _react2.default.createElement(\n                _reactstrap.NavLink,\n                { className: 'navbar-link', tag: _reactRouterDom.Link, to: '/categories' },\n                'Categories'\n              )\n            ),\n            _react2.default.createElement(\n              _reactstrap.NavItem,\n              null,\n              _react2.default.createElement(\n                _reactstrap.InputGroup,\n                null,\n                _react2.default.createElement(_reactstrap.Input, {\n                  className: 'navbar-link navbar-search',\n                  type: 'text',\n                  'aria-label': 'search',\n                  placeholder: 'Search...',\n                  style: { backgroundColor: this.getLightenedColorTheme() },\n                  onChange: this.onSearchChange\n                })\n              )\n            ),\n            _react2.default.createElement(\n              _reactstrap.NavItem,\n              null,\n              _react2.default.createElement(\n                _reactstrap.NavLink,\n                { className: 'navbar-link', tag: _reactRouterDom.Link, to: '/premium' },\n                'Premium'\n              )\n            ),\n            _react2.default.createElement(\n              _reactstrap.NavItem,\n              null,\n              _react2.default.createElement(\n                _reactstrap.NavLink,\n                { className: 'navbar-link', tag: _reactRouterDom.Link, to: '/login' },\n                'Login'\n              )\n            ),\n            _react2.default.createElement(\n              _reactstrap.NavItem,\n              null,\n              _react2.default.createElement(\n                _reactstrap.NavLink,\n                { className: 'navbar-link navbar-btn-signup', tag: _reactRouterDom.Link, to: '/signup' },\n                'Sign Up'\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return NavBar;\n}(_react2.default.Component);\n\nNavBar.propTypes = {};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps))(NavBar);\n\n//# sourceURL=webpack:///./components/NavBar/NavBar.jsx?");

/***/ }),

/***/ "./components/NavBar/index.js":
/*!************************************!*\
  !*** ./components/NavBar/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _NavBar = __webpack_require__(/*! ./NavBar */ \"./components/NavBar/NavBar.jsx\");\n\nvar _NavBar2 = _interopRequireDefault(_NavBar);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _NavBar2.default;\n\n//# sourceURL=webpack:///./components/NavBar/index.js?");

/***/ }),

/***/ "./components/Particles/Particles.jsx":
/*!********************************************!*\
  !*** ./components/Particles/Particles.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactParticlesJs = __webpack_require__(/*! react-particles-js */ \"react-particles-js\");\n\nvar _reactParticlesJs2 = _interopRequireDefault(_reactParticlesJs);\n\nvar _particlesSettings = __webpack_require__(/*! ./particlesSettings.json */ \"./components/Particles/particlesSettings.json\");\n\nvar _particlesSettings2 = _interopRequireDefault(_particlesSettings);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the Particles stateless functional component.\n *\n * @param {object} props\n */\nvar Particles = function Particles() {\n  return _react2.default.createElement(_reactParticlesJs2.default, {\n    params: _particlesSettings2.default,\n    className: 'particles-bg'\n  });\n};\n\nParticles.propTypes = {};\n\nexports.default = Particles;\n\n//# sourceURL=webpack:///./components/Particles/Particles.jsx?");

/***/ }),

/***/ "./components/Particles/index.js":
/*!***************************************!*\
  !*** ./components/Particles/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Particles = __webpack_require__(/*! ./Particles */ \"./components/Particles/Particles.jsx\");\n\nvar _Particles2 = _interopRequireDefault(_Particles);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Particles2.default;\n\n//# sourceURL=webpack:///./components/Particles/index.js?");

/***/ }),

/***/ "./components/Particles/particlesSettings.json":
/*!*****************************************************!*\
  !*** ./components/Particles/particlesSettings.json ***!
  \*****************************************************/
/*! exports provided: particles, retina_detect, default */
/***/ (function(module) {

eval("module.exports = {\"particles\":{\"number\":{\"value\":25,\"density\":{\"enable\":true,\"value_area\":2000}},\"color\":{\"value\":\"#fff\"},\"opacity\":{\"value\":0.5,\"random\":false,\"anim\":{\"enable\":false,\"speed\":1,\"opacity_min\":0.1,\"sync\":false}},\"size\":{\"value\":1,\"random\":true,\"anim\":{\"enable\":false,\"speed\":80,\"size_min\":0.1,\"sync\":false}},\"line_linked\":{\"enable\":true,\"distance\":250,\"color\":\"#fff\",\"opacity\":0.4,\"width\":1},\"move\":{\"enable\":true,\"speed\":6,\"direction\":\"none\",\"random\":true,\"straight\":false,\"out_mode\":\"out\",\"bounce\":false,\"attract\":{\"enable\":false,\"rotateX\":600,\"rotateY\":1200}}},\"retina_detect\":true};\n\n//# sourceURL=webpack:///./components/Particles/particlesSettings.json?");

/***/ }),

/***/ "./components/SignUpPage/SignUpPage.jsx":
/*!**********************************************!*\
  !*** ./components/SignUpPage/SignUpPage.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar _validator2 = _interopRequireDefault(_validator);\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _Logo = __webpack_require__(/*! components/Logo */ \"./components/Logo/index.js\");\n\nvar _Logo2 = _interopRequireDefault(_Logo);\n\nvar _signupSettings = __webpack_require__(/*! ../../settings/signupSettings */ \"./settings/signupSettings.js\");\n\nvar _ColorThemeActions = __webpack_require__(/*! ../../actions/ColorThemeActions */ \"./actions/ColorThemeActions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar SignUpPage = function (_React$Component) {\n  _inherits(SignUpPage, _React$Component);\n\n  function SignUpPage(props) {\n    _classCallCheck(this, SignUpPage);\n\n    var _this = _possibleConstructorReturn(this, (SignUpPage.__proto__ || Object.getPrototypeOf(SignUpPage)).call(this, props));\n\n    _this.handleSignupClicked = function () {\n      try {\n        _this.setState({\n          isFullNameError: false,\n          isEmailError: false,\n          isPasswordError: false,\n          serverError: ''\n        });\n\n        _this.validateFields();\n\n        if (!_this.state.isWaitingResponse) {\n          _this.setState({ isWaitingResponse: true });\n          _this.requestSignUp();\n        }\n      } catch (errors) {\n        errors.forEach(function (error) {\n          _this.setState(_defineProperty({}, error.type, true));\n        });\n      }\n    };\n\n    _this.requestSignUp = function () {\n      fetch('/accounts/sign-up', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          fullName: _this.state.fieldFullName,\n          email: _this.state.fieldEmail,\n          password: _this.state.fieldPassword\n        })\n      }).then(function (result) {\n        return result.json();\n      }).then(function (result) {\n        if (result.error) {\n          throw result;\n        }\n\n        _this.setState({ success: true, isWaitingResponse: false });\n      }).catch(function (err) {\n        var serverError = void 0;\n\n        if (!err) {\n          serverError = 'There was a problem signing up your account.';\n        }\n\n        if (err.error && err.error.code === 11000) {\n          serverError = 'A user with this email already exists.';\n        }\n\n        _this.setState({ serverError: serverError, isWaitingResponse: false });\n      });\n    };\n\n    _this.validateFields = function () {\n      var errors = [];\n\n      var fullName = _this.state.fieldFullName.trim();\n      if (fullName.length === 0) {\n        var error = new Error('`fullName` field must not be empty.');\n        error.type = 'isFullNameError';\n        errors.push(error);\n      }\n\n      var email = _this.state.fieldEmail.trim();\n      if (!_validator2.default.isEmail(email)) {\n        var _error = new Error('`email` field must be a valid email.');\n        _error.type = 'isEmailError';\n        errors.push(_error);\n      }\n\n      var password = _this.state.fieldPassword.trim();\n      if (password.length < _signupSettings.MIN_PASSWORD_LENGTH) {\n        var _error2 = new Error('`password` field must be at least ' + _signupSettings.MIN_PASSWORD_LENGTH + ' characters long.');\n        _error2.type = 'isPasswordError';\n        errors.push(_error2);\n      }\n\n      if (errors.length > 0) {\n        throw errors;\n      }\n    };\n\n    _this.handleFieldChanged = function (e, fieldKey) {\n      var text = e.target.value.trim();\n      _this.setState(_defineProperty({}, fieldKey, text));\n    };\n\n    _this.state = {\n      fieldFullName: '',\n      fieldEmail: '',\n      fieldPassword: '',\n      isFullNameError: false,\n      isEmailError: false,\n      isPasswordError: false,\n      serverError: '',\n      isWaitingResponse: false,\n      success: false\n    };\n    return _this;\n  }\n\n  _createClass(SignUpPage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.props.dispatch((0, _ColorThemeActions.resetColorTheme)());\n    }\n\n    /**\n     * Handles submitting with the given sign up information.\n     */\n\n\n    /**\n     * Makes request to server to attempt to sign up user with the given information.\n     */\n\n\n    /**\n     * Validates the input fields, and throws list of errors if any are invalid.\n     */\n\n\n    /**\n     * Handles the change the field with the given key.\n     *\n     * @param {Event} e\n     * @param {string} fieldKey\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the SignUpPage component.\n     */\n    value: function render() {\n      var _this2 = this;\n\n      if (this.state.success) {\n        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/dashboard' });\n      }\n\n      return _react2.default.createElement(\n        _reactstrap.Container,\n        { fluid: true },\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '8' },\n            _react2.default.createElement(\n              'div',\n              { className: 'mx-auto sign-up-page-card-container' },\n              _react2.default.createElement(\n                _reactstrap.Card,\n                { className: 'sign-up-page-card' },\n                _react2.default.createElement(\n                  _reactstrap.CardBody,\n                  null,\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'sign-up-page-logo-container' },\n                    _react2.default.createElement(_Logo2.default, {\n                      width: '100px',\n                      height: '100px',\n                      dark: true\n                    })\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'sign-up-page-title' },\n                    'Sign Up For An Account'\n                  ),\n                  this.state.serverError && _react2.default.createElement(\n                    'div',\n                    { className: 'sign-up-page-server-error' },\n                    this.state.serverError\n                  ),\n                  _react2.default.createElement(\n                    _reactstrap.Form,\n                    { className: 'sign-up-page-form' },\n                    _react2.default.createElement(\n                      _reactstrap.FormGroup,\n                      null,\n                      _react2.default.createElement('i', { className: 'fa fa-user prefix grey-text' }),\n                      _react2.default.createElement(\n                        'label',\n                        { htmlFor: 'sign-up-page-full-name', className: 'sign-up-page-label' },\n                        'Full Name'\n                      ),\n                      _react2.default.createElement(\n                        _reactstrap.InputGroup,\n                        null,\n                        _react2.default.createElement(_reactstrap.Input, {\n                          className: 'sign-up-page-input',\n                          type: 'email',\n                          id: 'sign-up-page-full-name',\n                          autoComplete: 'off',\n                          onChange: function onChange(e) {\n                            return _this2.handleFieldChanged(e, 'fieldFullName');\n                          }\n                        })\n                      ),\n                      this.state.isFullNameError && _react2.default.createElement(\n                        'div',\n                        { className: 'sign-up-page-input-error' },\n                        'Cannot be empty.'\n                      )\n                    ),\n                    _react2.default.createElement(\n                      _reactstrap.FormGroup,\n                      null,\n                      _react2.default.createElement('i', { className: 'fa fa-envelope prefix grey-text' }),\n                      _react2.default.createElement(\n                        'label',\n                        { htmlFor: 'sign-up-page-email', className: 'sign-up-page-label' },\n                        'Email'\n                      ),\n                      _react2.default.createElement(\n                        _reactstrap.InputGroup,\n                        null,\n                        _react2.default.createElement(_reactstrap.Input, {\n                          className: 'sign-up-page-input',\n                          type: 'email',\n                          id: 'sign-up-page-email',\n                          autoComplete: 'off',\n                          onChange: function onChange(e) {\n                            return _this2.handleFieldChanged(e, 'fieldEmail');\n                          }\n                        })\n                      ),\n                      this.state.isEmailError && _react2.default.createElement(\n                        'div',\n                        { className: 'sign-up-page-input-error' },\n                        'Must be a valid email.'\n                      )\n                    ),\n                    _react2.default.createElement(\n                      _reactstrap.FormGroup,\n                      null,\n                      _react2.default.createElement('i', { className: 'fa fa-lock prefix grey-text' }),\n                      _react2.default.createElement(\n                        'label',\n                        { htmlFor: 'sign-up-page-password', className: 'sign-up-page-label' },\n                        'Password'\n                      ),\n                      _react2.default.createElement(\n                        _reactstrap.InputGroup,\n                        null,\n                        _react2.default.createElement(_reactstrap.Input, {\n                          className: 'sign-up-page-input',\n                          type: 'password',\n                          id: 'sign-up-page-password',\n                          autoComplete: 'off',\n                          onChange: function onChange(e) {\n                            return _this2.handleFieldChanged(e, 'fieldPassword');\n                          }\n                        })\n                      ),\n                      this.state.isPasswordError && _react2.default.createElement(\n                        'div',\n                        { className: 'sign-up-page-input-error' },\n                        'Must be at least 8 characters long.'\n                      )\n                    )\n                  ),\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'sign-up-page-btn-register-container' },\n                    _react2.default.createElement(\n                      _reactstrap.Button,\n                      {\n                        className: 'sign-up-page-btn-register',\n                        color: 'primary',\n                        onClick: this.handleSignupClicked\n                      },\n                      'Register'\n                    )\n                  )\n                )\n              )\n            )\n          ),\n          _react2.default.createElement(_reactstrap.Col, { md: '2' })\n        )\n      );\n    }\n  }]);\n\n  return SignUpPage;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(SignUpPage);\n\n//# sourceURL=webpack:///./components/SignUpPage/SignUpPage.jsx?");

/***/ }),

/***/ "./components/SignUpPage/SignUpPageContainer.jsx":
/*!*******************************************************!*\
  !*** ./components/SignUpPage/SignUpPageContainer.jsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Particles = __webpack_require__(/*! components/Particles */ \"./components/Particles/index.js\");\n\nvar _Particles2 = _interopRequireDefault(_Particles);\n\nvar _SignUpPage = __webpack_require__(/*! ./SignUpPage */ \"./components/SignUpPage/SignUpPage.jsx\");\n\nvar _SignUpPage2 = _interopRequireDefault(_SignUpPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the SignUpPageContainer stateless functional component.\n *\n * @param {object} props\n */\nvar SignUpPageContainer = function SignUpPageContainer() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_Particles2.default, null),\n    _react2.default.createElement(_SignUpPage2.default, null)\n  );\n};\n\nexports.default = SignUpPageContainer;\n\n//# sourceURL=webpack:///./components/SignUpPage/SignUpPageContainer.jsx?");

/***/ }),

/***/ "./components/SignUpPage/index.js":
/*!****************************************!*\
  !*** ./components/SignUpPage/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _SignUpPageContainer = __webpack_require__(/*! ./SignUpPageContainer */ \"./components/SignUpPage/SignUpPageContainer.jsx\");\n\nvar _SignUpPageContainer2 = _interopRequireDefault(_SignUpPageContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _SignUpPageContainer2.default;\n\n//# sourceURL=webpack:///./components/SignUpPage/index.js?");

/***/ }),

/***/ "./components/TopicItemPage/TopicItemArticle.jsx":
/*!*******************************************************!*\
  !*** ./components/TopicItemPage/TopicItemArticle.jsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _Markdown = __webpack_require__(/*! components/Markdown */ \"./components/Markdown/index.js\");\n\nvar _Markdown2 = _interopRequireDefault(_Markdown);\n\nvar _getS3ArticleUrl = __webpack_require__(/*! utils/getS3ArticleUrl */ \"./utils/getS3ArticleUrl.js\");\n\nvar _getS3ArticleUrl2 = _interopRequireDefault(_getS3ArticleUrl);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TopicItemArticle = function (_React$Component) {\n  _inherits(TopicItemArticle, _React$Component);\n\n  function TopicItemArticle(props) {\n    _classCallCheck(this, TopicItemArticle);\n\n    var _this = _possibleConstructorReturn(this, (TopicItemArticle.__proto__ || Object.getPrototypeOf(TopicItemArticle)).call(this, props));\n\n    _this.state = { url: '' };\n    return _this;\n  }\n\n  _createClass(TopicItemArticle, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.setState({ url: (0, _getS3ArticleUrl2.default)(this.props.match.params) });\n    }\n\n    /**\n     * Renders the TopicItemArticle component.\n     */\n\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(_Markdown2.default, {\n        url: this.state.url,\n        onLoaded: this.props.contentLoaded()\n      });\n    }\n  }]);\n\n  return TopicItemArticle;\n}(_react2.default.Component);\n\nTopicItemArticle.propTypes = {\n  contentLoaded: _propTypes2.default.func\n  // metaData: PropTypes.array,\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _redux.compose)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(mapStateToProps))(TopicItemArticle);\n\n//# sourceURL=webpack:///./components/TopicItemPage/TopicItemArticle.jsx?");

/***/ }),

/***/ "./components/TopicItemPage/TopicItemBar.jsx":
/*!***************************************************!*\
  !*** ./components/TopicItemPage/TopicItemBar.jsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Renders the TopicItemBar stateless functional component.\n *\n * @param {object} props\n */\nvar TopicItemBar = function TopicItemBar(props) {\n  return _react2.default.createElement(\n    'div',\n    { className: 'topic-item-bar-container' },\n    _react2.default.createElement(\n      'div',\n      { className: 'topic-item-bar-item' },\n      _react2.default.createElement(\n        _reactstrap.Button,\n        {\n          color: 'primary',\n          className: 'topic-item-bar-btn',\n          onClick: props.onMarkAsCompleted\n        },\n        _react2.default.createElement('i', {\n          className: 'fas fa-check',\n          style: { marginRight: '0.5em' }\n        }),\n        !props.isCompleted ? 'Mark as Completed' : 'Mark as Uncompleted'\n      )\n    ),\n    _react2.default.createElement(\n      'div',\n      { className: 'topic-item-bar-item' },\n      _react2.default.createElement(\n        _reactstrap.Button,\n        {\n          color: 'primary',\n          className: 'topic-item-bar-btn',\n          onClick: props.onSaveToBookmarks\n        },\n        _react2.default.createElement('i', {\n          className: 'fas fa-star',\n          style: { marginRight: '0.5em' }\n        }),\n        !props.isBookmarked ? 'Save to Bookmarks' : 'Remove from Bookmarks'\n      )\n    )\n  );\n};\n\nTopicItemBar.propTypes = {\n  isCompleted: _propTypes2.default.bool,\n  isBookmarked: _propTypes2.default.bool\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(TopicItemBar);\n\n//# sourceURL=webpack:///./components/TopicItemPage/TopicItemBar.jsx?");

/***/ }),

/***/ "./components/TopicItemPage/TopicItemCode.jsx":
/*!****************************************************!*\
  !*** ./components/TopicItemPage/TopicItemCode.jsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _rcTabs = __webpack_require__(/*! rc-tabs */ \"rc-tabs\");\n\nvar _rcTabs2 = _interopRequireDefault(_rcTabs);\n\nvar _TabContent = __webpack_require__(/*! rc-tabs/lib/TabContent */ \"rc-tabs/lib/TabContent\");\n\nvar _TabContent2 = _interopRequireDefault(_TabContent);\n\nvar _ScrollableInkTabBar = __webpack_require__(/*! rc-tabs/lib/ScrollableInkTabBar */ \"rc-tabs/lib/ScrollableInkTabBar\");\n\nvar _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);\n\nvar _Markdown = __webpack_require__(/*! components/Markdown */ \"./components/Markdown/index.js\");\n\nvar _Markdown2 = _interopRequireDefault(_Markdown);\n\nvar _markdownUtils = __webpack_require__(/*! utils/markdownUtils */ \"./utils/markdownUtils.js\");\n\n__webpack_require__(/*! rc-tabs/assets/index.css */ \"rc-tabs/assets/index.css\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TopicItemCode = function (_React$Component) {\n  _inherits(TopicItemCode, _React$Component);\n\n  function TopicItemCode(props) {\n    _classCallCheck(this, TopicItemCode);\n\n    var _this = _possibleConstructorReturn(this, (TopicItemCode.__proto__ || Object.getPrototypeOf(TopicItemCode)).call(this, props));\n\n    _this.getCodeContent = function () {\n      var promises = [];\n      var metaData = _this.state.metaData;\n\n      metaData.forEach(function (codeItem) {\n        promises.push(fetch(codeItem.resourceUrl));\n      });\n\n      Promise.all(promises).then(function (result) {\n        return Promise.all(result.map(function (x) {\n          return x.text();\n        }));\n      }).then(function (result) {\n        var codeContent = result.map(function (codeStr, i) {\n          return _extends({}, metaData[i], { codeStr: codeStr });\n        });\n        _this.setState({ codeContent: codeContent });\n      }).catch(function (err) {\n        return _this.setState({ error: err });\n      });\n    };\n\n    _this.getTabPanes = function () {\n      return _this.state.codeContent.map(function (codeItem, i) {\n        return _react2.default.createElement(\n          _rcTabs.TabPane,\n          { tab: codeItem.title, key: i },\n          _react2.default.createElement(_Markdown2.default, {\n            markdownStr: (0, _markdownUtils.wrapTextIntoMarkdownCodeBlock)(codeItem.codeStr, codeItem.language)\n          })\n        );\n      });\n    };\n\n    _this.state = {\n      codeContent: [],\n      metaData: [],\n      error: ''\n    };\n    return _this;\n  }\n\n  _createClass(TopicItemCode, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.props.contentLoaded();\n      this.setState({ error: '', metaData: this.props.metaData });\n      this.getCodeContent();\n    }\n\n    /**\n     * Fetches the code text content from its corresponding resource URL.\n     */\n\n\n    /**\n     * Renders the TabPanes based on the codeContent.\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the TopicItemCode component.\n     */\n    value: function render() {\n      if (this.state.error) {\n        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });\n      }\n\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          _rcTabs2.default,\n          {\n            defaultActiveKey: '0',\n            renderTabBar: function renderTabBar() {\n              return _react2.default.createElement(_ScrollableInkTabBar2.default, null);\n            },\n            renderTabContent: function renderTabContent() {\n              return _react2.default.createElement(_TabContent2.default, null);\n            }\n          },\n          this.getTabPanes()\n        )\n      );\n    }\n  }]);\n\n  return TopicItemCode;\n}(_react2.default.Component);\n\nTopicItemCode.propTypes = {\n  contentLoaded: _propTypes2.default.func,\n  metaData: _propTypes2.default.array\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(TopicItemCode);\n\n//# sourceURL=webpack:///./components/TopicItemPage/TopicItemCode.jsx?");

/***/ }),

/***/ "./components/TopicItemPage/TopicItemContainer.jsx":
/*!*********************************************************!*\
  !*** ./components/TopicItemPage/TopicItemContainer.jsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactMdSpinner = __webpack_require__(/*! react-md-spinner */ \"react-md-spinner\");\n\nvar _reactMdSpinner2 = _interopRequireDefault(_reactMdSpinner);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _TopicItemArticle = __webpack_require__(/*! ./TopicItemArticle */ \"./components/TopicItemPage/TopicItemArticle.jsx\");\n\nvar _TopicItemArticle2 = _interopRequireDefault(_TopicItemArticle);\n\nvar _TopicItemCode = __webpack_require__(/*! ./TopicItemCode */ \"./components/TopicItemPage/TopicItemCode.jsx\");\n\nvar _TopicItemCode2 = _interopRequireDefault(_TopicItemCode);\n\nvar _TopicItemBar = __webpack_require__(/*! ./TopicItemBar */ \"./components/TopicItemPage/TopicItemBar.jsx\");\n\nvar _TopicItemBar2 = _interopRequireDefault(_TopicItemBar);\n\nvar _getColorFromKey = __webpack_require__(/*! ../../utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TopicItemContainer = function (_React$Component) {\n  _inherits(TopicItemContainer, _React$Component);\n\n  function TopicItemContainer(props) {\n    _classCallCheck(this, TopicItemContainer);\n\n    var _this = _possibleConstructorReturn(this, (TopicItemContainer.__proto__ || Object.getPrototypeOf(TopicItemContainer)).call(this, props));\n\n    _this.requestCompletionAndBookmarkStatus = function () {\n      // TODO\n    };\n\n    _this.handleContentLoaded = function () {\n      _this.setState({ loading: false });\n    };\n\n    _this.getTopicItemComponent = function () {\n      if (!_this.state.topicItem) {\n        return undefined;\n      }\n\n      // Collect items with the same type:\n      var metaData = _this.state.topic.children.filter(function (item) {\n        return item.type === _this.state.topicItem.type;\n      });\n\n      switch (_this.state.topicItem.type) {\n        case 'article':\n          return _react2.default.createElement(_TopicItemArticle2.default, {\n            contentLoaded: _this.handleContentLoaded,\n            type: _this.state.topicItem.type\n          });\n        case 'code':\n          return _react2.default.createElement(_TopicItemCode2.default, {\n            contentLoaded: _this.handleContentLoaded,\n            type: _this.state.topicItem.type,\n            metaData: metaData\n          });\n        default:\n          return null;\n      }\n    };\n\n    _this.state = {\n      loading: false,\n      isCompleted: false,\n      isBookmarked: false,\n      topicItem: null,\n      topic: null\n    };\n    return _this;\n  }\n\n  _createClass(TopicItemContainer, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.setState({\n        loading: true,\n        topicItem: this.props.topicItem,\n        topic: this.props.topic\n      });\n    }\n  }, {\n    key: 'componentWillReceiveProps',\n    value: function componentWillReceiveProps(newProps) {\n      this.setState({\n        loading: true,\n        topicItem: newProps.topicItem,\n        topic: newProps.topic\n      });\n    }\n\n    /**\n     * Makes a request to the server to check the completion and bookmark status of this current\n     * topic item for this current logged in user.\n     */\n\n\n    /**\n     * Handles when the content finishes loading.\n     */\n\n\n    /**\n     * Returns the topic item component that corresponds to the topic item type.\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the TopicItemContainer component.\n     */\n    value: function render() {\n      return _react2.default.createElement(\n        _reactstrap.Container,\n        { fluid: true },\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(_reactstrap.Col, { md: '2' }),\n          _react2.default.createElement(\n            _reactstrap.Col,\n            { md: '8' },\n            this.state.loading && _react2.default.createElement(\n              'div',\n              { className: 'topic-item-page-spinner-container' },\n              _react2.default.createElement(_reactMdSpinner2.default, {\n                size: 50,\n                singleColor: (0, _getColorFromKey2.default)(this.props.colorKey)\n              })\n            ),\n            !this.state.loading && _react2.default.createElement(_TopicItemBar2.default, {\n              onMarkAsCompleted: this.props.onMarkAsCompleted,\n              onSaveToBookmarks: this.props.onSaveToBookmarks,\n              isCompleted: this.state.isCompleted,\n              isBookmarked: this.state.isBookmarked\n            }),\n            _react2.default.createElement(\n              'div',\n              { className: 'topic-item-container' },\n              this.getTopicItemComponent()\n            )\n          ),\n          _react2.default.createElement(_reactstrap.Col, { md: '2' })\n        )\n      );\n    }\n  }]);\n\n  return TopicItemContainer;\n}(_react2.default.Component);\n\nTopicItemContainer.propTypes = {\n  onMarkAsCompleted: _propTypes2.default.func,\n  onSaveToBookmarks: _propTypes2.default.func,\n  topicItem: _propTypes2.default.object,\n  topic: _propTypes2.default.object\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(TopicItemContainer);\n\n//# sourceURL=webpack:///./components/TopicItemPage/TopicItemContainer.jsx?");

/***/ }),

/***/ "./components/TopicItemPage/TopicItemNavBar.jsx":
/*!******************************************************!*\
  !*** ./components/TopicItemPage/TopicItemNavBar.jsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactstrap = __webpack_require__(/*! reactstrap */ \"reactstrap\");\n\nvar _getColorFromKey = __webpack_require__(/*! ../../utils/getColorFromKey */ \"./utils/getColorFromKey.js\");\n\nvar _getColorFromKey2 = _interopRequireDefault(_getColorFromKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TopicItemNavBar = function (_React$Component) {\n  _inherits(TopicItemNavBar, _React$Component);\n\n  function TopicItemNavBar(props) {\n    _classCallCheck(this, TopicItemNavBar);\n\n    var _this = _possibleConstructorReturn(this, (TopicItemNavBar.__proto__ || Object.getPrototypeOf(TopicItemNavBar)).call(this, props));\n\n    _this.handleClick = function (index) {\n      _this.setState({ indexSelected: index });\n    };\n\n    _this.state = {\n      indexSelected: 0,\n      topicItemTypes: []\n    };\n    return _this;\n  }\n\n  _createClass(TopicItemNavBar, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.setState({\n        indexSelected: this.props.indexStart,\n        topicItemTypes: this.props.topicItemTypes\n      });\n    }\n  }, {\n    key: 'componentWillReceiveProps',\n    value: function componentWillReceiveProps(newProps) {\n      this.setState({\n        indexSelected: newProps.indexStart,\n        topicItemTypes: newProps.topicItemTypes\n      });\n    }\n\n    /**\n     * Handles when an item in the navbar is clicked by changing the index.\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the TopicItemNavBar component.\n     */\n    value: function render() {\n      var _this2 = this;\n\n      return _react2.default.createElement(\n        _reactstrap.Container,\n        { fluid: true },\n        _react2.default.createElement(\n          _reactstrap.Row,\n          null,\n          _react2.default.createElement(\n            'div',\n            { className: 'topic-item-navbar-container' },\n            _react2.default.createElement(\n              'ul',\n              { className: 'nav justify-content-center grey lighten-4 navbar-topic' },\n              this.state.topicItemTypes && this.state.topicItemTypes.map(function (item, i) {\n                var activeClass = i === _this2.state.indexSelected ? 'topic-item-navbar-item-active' : '';\n\n                return _react2.default.createElement(\n                  'li',\n                  {\n                    key: i,\n                    className: 'nav-item ' + activeClass,\n                    style: { color: (0, _getColorFromKey2.default)(_this2.props.colorKey) }\n                  },\n                  _react2.default.createElement(\n                    'div',\n                    { className: 'topic-item-navbar-item' },\n                    _react2.default.createElement(\n                      'a',\n                      { onClick: function onClick() {\n                          _this2.handleClick(i);\n                          _this2.props.handleChangeIndex(i);\n                        }\n                      },\n                      item.title\n                    )\n                  )\n                );\n              })\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return TopicItemNavBar;\n}(_react2.default.Component);\n\nTopicItemNavBar.propTypes = {\n  indexStart: _propTypes2.default.number,\n  topicItemTypes: _propTypes2.default.array\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(TopicItemNavBar);\n\n//# sourceURL=webpack:///./components/TopicItemPage/TopicItemNavBar.jsx?");

/***/ }),

/***/ "./components/TopicItemPage/TopicItemPage.jsx":
/*!****************************************************!*\
  !*** ./components/TopicItemPage/TopicItemPage.jsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _createBrowserHistory = __webpack_require__(/*! history/createBrowserHistory */ \"history/createBrowserHistory\");\n\nvar _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);\n\nvar _JumbotronSmall = __webpack_require__(/*! components/JumbotronSmall */ \"./components/JumbotronSmall/index.js\");\n\nvar _JumbotronSmall2 = _interopRequireDefault(_JumbotronSmall);\n\nvar _ColorThemeActions = __webpack_require__(/*! actions/ColorThemeActions */ \"./actions/ColorThemeActions.js\");\n\nvar _routeUtils = __webpack_require__(/*! utils/routeUtils */ \"./utils/routeUtils.js\");\n\nvar _topicItemUtils = __webpack_require__(/*! utils/topicItemUtils */ \"./utils/topicItemUtils.js\");\n\nvar _TopicItemNavBar = __webpack_require__(/*! ./TopicItemNavBar */ \"./components/TopicItemPage/TopicItemNavBar.jsx\");\n\nvar _TopicItemNavBar2 = _interopRequireDefault(_TopicItemNavBar);\n\nvar _TopicItemContainer = __webpack_require__(/*! ./TopicItemContainer */ \"./components/TopicItemPage/TopicItemContainer.jsx\");\n\nvar _TopicItemContainer2 = _interopRequireDefault(_TopicItemContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TopicItemPage = function (_React$Component) {\n  _inherits(TopicItemPage, _React$Component);\n\n  function TopicItemPage(props) {\n    _classCallCheck(this, TopicItemPage);\n\n    var _this = _possibleConstructorReturn(this, (TopicItemPage.__proto__ || Object.getPrototypeOf(TopicItemPage)).call(this, props));\n\n    _this.requestTopicData = function (categoryKey, subcategoryKey, topicKey) {\n      Promise.all([fetch('/data/categories/' + categoryKey + '/' + subcategoryKey + '/' + topicKey), fetch('/data/categories/' + categoryKey + '/' + subcategoryKey), fetch('/data/categories/' + categoryKey)]).then(function (result) {\n        return Promise.all(result.map(function (x) {\n          return x.json();\n        }));\n      }).then(function (result) {\n        var _result = _slicedToArray(result, 3),\n            topicData = _result[0],\n            subcategoryData = _result[1],\n            categoryData = _result[2];\n\n        if (topicData.error || subcategoryData.error || categoryData.error) {\n          throw result;\n        }\n\n        _this.props.dispatch((0, _ColorThemeActions.setColorTheme)(categoryData.data.colorKey));\n        var topicItemTypes = (0, _topicItemUtils.getTopicItemTypes)(topicData.data.children);\n        _this.setState({\n          topic: topicData.data,\n          subcategory: subcategoryData.data,\n          topicItemTypes: topicItemTypes\n        });\n        _this.fixQueryString(topicItemTypes);\n      }).catch(function (err) {\n        return _this.setState({ error: err });\n      });\n    };\n\n    _this.fixQueryString = function (topicItemTypes) {\n      var indexFromQueryString = (0, _routeUtils.getItemIndexFromQueryString)(_this.props.location.search);\n\n      if (indexFromQueryString !== undefined && indexFromQueryString >= 0 && indexFromQueryString < topicItemTypes.length) {\n        _this.setState({ indexSelected: indexFromQueryString });\n      } else {\n        _this.history.replace({ pathname: _this.props.match.url, search: '?item=0' });\n        _this.setState({ indexSelected: 0 });\n      }\n    };\n\n    _this.handleChangeIndex = function (index) {\n      _this.setState({ indexSelected: index });\n      _this.history.push({\n        pathname: _this.props.match.url,\n        search: '?item=' + index\n      });\n    };\n\n    _this.getCurrentKeyParameters = function () {\n      var _this$props$match$par = _this.props.match.params,\n          categoryKey = _this$props$match$par.categoryKey,\n          subcategoryKey = _this$props$match$par.subcategoryKey,\n          topicKey = _this$props$match$par.topicKey;\n\n      var topicItemType = _this.state.topicItemTypes[_this.state.indexSelected].type;\n      return {\n        categoryKey: categoryKey,\n        subcategoryKey: subcategoryKey,\n        topicKey: topicKey,\n        topicItemType: topicItemType\n      };\n    };\n\n    _this.handleMarkAsCompleted = function () {\n      var params = _this.getCurrentKeyParameters();\n      console.log(params);\n    };\n\n    _this.handleSaveToBookmarks = function () {\n      var params = _this.getCurrentKeyParameters();\n      console.log(params);\n    };\n\n    _this.state = {\n      topic: {},\n      subcategory: {},\n      indexSelected: 0,\n      topicItemTypes: [],\n      error: ''\n    };\n    return _this;\n  }\n\n  _createClass(TopicItemPage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {\n      this.history = (0, _createBrowserHistory2.default)();\n      this.setState({ error: '' });\n      var _props$match$params = this.props.match.params,\n          categoryKey = _props$match$params.categoryKey,\n          subcategoryKey = _props$match$params.subcategoryKey,\n          topicKey = _props$match$params.topicKey;\n\n      this.requestTopicData(categoryKey, subcategoryKey, topicKey);\n    }\n\n    /**\n     * Makes request to the server to get the data for a particular topic.\n     *\n     * @param {string} categoryKey\n     * @param {string} subcategoryKey\n     * @param {string} topicKey\n     */\n\n\n    /**\n     * Fixes the query string if its index is out of bounds, and fixes the currently selected\n     * index for the TopicItemNavbar.\n     */\n\n\n    /**\n     * Handles changing the index for the TopicItemNavbar.\n     */\n\n\n    /**\n     * Returns the key parameters for this current topic item, including the type (`article`, `code`,\n     * etc.)\n     */\n\n\n    /**\n     * Handles mark as completed for the current topic item.\n     */\n\n\n    /**\n     * Handles save to bookmarks for the current topic item.\n     */\n\n  }, {\n    key: 'render',\n\n\n    /**\n     * Renders the TopicItemPage component.\n     */\n    value: function render() {\n      if (this.state.error) {\n        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });\n      }\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'topic-item-page-container' },\n        _react2.default.createElement(_JumbotronSmall2.default, {\n          title: this.state.topic.title,\n          subtitle: this.state.subcategory.title,\n          urlKey: '/categories/' + this.state.subcategory.key\n        }),\n        _react2.default.createElement(_TopicItemNavBar2.default, {\n          indexStart: this.state.indexSelected,\n          handleChangeIndex: this.handleChangeIndex,\n          topicItemTypes: this.state.topicItemTypes\n        }),\n        _react2.default.createElement(_TopicItemContainer2.default, {\n          topic: this.state.topic,\n          topicItem: this.state.topicItemTypes[this.state.indexSelected],\n          onMarkAsCompleted: this.handleMarkAsCompleted,\n          onSaveToBookmarks: this.handleSaveToBookmarks\n        })\n      );\n    }\n  }]);\n\n  return TopicItemPage;\n}(_react2.default.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    colorKey: state.colorKey\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(TopicItemPage);\n\n//# sourceURL=webpack:///./components/TopicItemPage/TopicItemPage.jsx?");

/***/ }),

/***/ "./components/TopicItemPage/index.js":
/*!*******************************************!*\
  !*** ./components/TopicItemPage/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _TopicItemPage = __webpack_require__(/*! ./TopicItemPage */ \"./components/TopicItemPage/TopicItemPage.jsx\");\n\nvar _TopicItemPage2 = _interopRequireDefault(_TopicItemPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _TopicItemPage2.default;\n\n//# sourceURL=webpack:///./components/TopicItemPage/index.js?");

/***/ }),

/***/ "./reducers/ColorThemeReducer.js":
/*!***************************************!*\
  !*** ./reducers/ColorThemeReducer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar ColorThemeReducerDefaultState = 'main';\n\nexports.default = function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ColorThemeReducerDefaultState;\n  var action = arguments[1];\n\n  switch (action.type) {\n    case 'SET_COLOR':\n      return action.colorKey;\n    case 'RESET_COLOR':\n      return 0;\n    default:\n      return state;\n  }\n};\n\n//# sourceURL=webpack:///./reducers/ColorThemeReducer.js?");

/***/ }),

/***/ "./routers/AppRouter.jsx":
/*!*******************************!*\
  !*** ./routers/AppRouter.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n// import SearchPage from '../components/SearchPage/';\n\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _NavBar = __webpack_require__(/*! components/NavBar */ \"./components/NavBar/index.js\");\n\nvar _NavBar2 = _interopRequireDefault(_NavBar);\n\nvar _MainPage = __webpack_require__(/*! components/MainPage */ \"./components/MainPage/index.js\");\n\nvar _MainPage2 = _interopRequireDefault(_MainPage);\n\nvar _LoginPage = __webpack_require__(/*! components/LoginPage */ \"./components/LoginPage/index.js\");\n\nvar _LoginPage2 = _interopRequireDefault(_LoginPage);\n\nvar _SignUpPage = __webpack_require__(/*! components/SignUpPage */ \"./components/SignUpPage/index.js\");\n\nvar _SignUpPage2 = _interopRequireDefault(_SignUpPage);\n\nvar _DashboardPage = __webpack_require__(/*! components/DashboardPage */ \"./components/DashboardPage/index.js\");\n\nvar _DashboardPage2 = _interopRequireDefault(_DashboardPage);\n\nvar _ContentPage = __webpack_require__(/*! components/ContentPage */ \"./components/ContentPage/index.js\");\n\nvar _ContentPage2 = _interopRequireDefault(_ContentPage);\n\nvar _TopicItemPage = __webpack_require__(/*! components/TopicItemPage */ \"./components/TopicItemPage/index.js\");\n\nvar _TopicItemPage2 = _interopRequireDefault(_TopicItemPage);\n\nvar _InformationPage = __webpack_require__(/*! components/InformationPage */ \"./components/InformationPage/index.js\");\n\nvar _InformationPage2 = _interopRequireDefault(_InformationPage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar AppRouter = function AppRouter() {\n  return _react2.default.createElement(\n    _reactRouterDom.BrowserRouter,\n    null,\n    _react2.default.createElement(\n      'div',\n      null,\n      _react2.default.createElement(_NavBar2.default, null),\n      _react2.default.createElement(\n        _reactRouterDom.Switch,\n        null,\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/',\n          component: _MainPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/login',\n          component: _LoginPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/signup',\n          component: _SignUpPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/premium',\n          component: _MainPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/about',\n          component: function component(props) {\n            return _react2.default.createElement(_InformationPage2.default, _extends({}, props, { informationKey: 'about' }));\n          },\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/terms-and-conditions',\n          component: function component(props) {\n            return _react2.default.createElement(_InformationPage2.default, _extends({}, props, { informationKey: 'terms-and-conditions' }));\n          },\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/privacy-policy',\n          component: function component(props) {\n            return _react2.default.createElement(_InformationPage2.default, _extends({}, props, { informationKey: 'privacy-policy' }));\n          },\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/dashboard',\n          component: _DashboardPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/categories',\n          component: _ContentPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/categories/:categoryKey',\n          component: _ContentPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/categories/:categoryKey/:subcategoryKey',\n          component: _ContentPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '/categories/:categoryKey/:subcategoryKey/:topicKey',\n          component: _TopicItemPage2.default,\n          exact: true\n        }),\n        _react2.default.createElement(_reactRouterDom.Route, {\n          path: '*',\n          component: function component() {\n            return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });\n          }\n        })\n      )\n    )\n  );\n};\n\nexports.default = AppRouter;\n\n//# sourceURL=webpack:///./routers/AppRouter.jsx?");

/***/ }),

/***/ "./settings/s3Settings.js":
/*!********************************!*\
  !*** ./settings/s3Settings.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar S3_URL_PREFIX = exports.S3_URL_PREFIX = 'https://s3.amazonaws.com/algorithm-helper/content/categories';\n\n//# sourceURL=webpack:///./settings/s3Settings.js?");

/***/ }),

/***/ "./settings/signupSettings.js":
/*!************************************!*\
  !*** ./settings/signupSettings.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar MIN_PASSWORD_LENGTH = exports.MIN_PASSWORD_LENGTH = 8;\n\n//# sourceURL=webpack:///./settings/signupSettings.js?");

/***/ }),

/***/ "./store/configureStore.js":
/*!*********************************!*\
  !*** ./store/configureStore.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _ColorThemeReducer = __webpack_require__(/*! ../reducers/ColorThemeReducer */ \"./reducers/ColorThemeReducer.js\");\n\nvar _ColorThemeReducer2 = _interopRequireDefault(_ColorThemeReducer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function () {\n  var store = (0, _redux.createStore)((0, _redux.combineReducers)({\n    colorKey: _ColorThemeReducer2.default\n  }));\n  return store;\n};\n\n//# sourceURL=webpack:///./store/configureStore.js?");

/***/ }),

/***/ "./styles/styles.scss":
/*!****************************!*\
  !*** ./styles/styles.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./styles/styles.scss?");

/***/ }),

/***/ "./utils/getColorFromKey.js":
/*!**********************************!*\
  !*** ./utils/getColorFromKey.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// From Material Design Colors:\nvar mapColorKeyToColor = {\n  0: '#072A60',\n  1: '#64B5F6', // Light Blue 300\n  2: '#BA68C8', // Purple 300\n  3: '#81C784', // Green 300\n  4: '#7986CB', // Indigo 300\n  5: '#9575CD', // Deep Purple 300\n  6: '#4DB6AC', // Teal 300\n  7: '#FFB74D', // Orange 300\n  8: '#E57373', // Red 300\n  9: '#90A4AE' // Blue Grey 300\n};\n\n/**\n * Returns the hex color corresponding to the given key, undefined otherwise.\n *\n * @param {string|number} key\n */\nvar getColorFromKey = function getColorFromKey(key) {\n  return mapColorKeyToColor[key];\n};\n\nexports.default = getColorFromKey;\n\n//# sourceURL=webpack:///./utils/getColorFromKey.js?");

/***/ }),

/***/ "./utils/getS3ArticleUrl.js":
/*!**********************************!*\
  !*** ./utils/getS3ArticleUrl.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _s3Settings = __webpack_require__(/*! ../settings/s3Settings */ \"./settings/s3Settings.js\");\n\n/**\n * Returns the S3 article url corresponding to the params.\n *\n * @param {object} params\n */\nvar getS3ArticleUrl = function getS3ArticleUrl(params) {\n  var categoryKey = params.categoryKey,\n      subcategoryKey = params.subcategoryKey,\n      topicKey = params.topicKey;\n\n  return _s3Settings.S3_URL_PREFIX + '/' + categoryKey + '/' + subcategoryKey + '/' + topicKey + '.md';\n};\n\nexports.default = getS3ArticleUrl;\n\n//# sourceURL=webpack:///./utils/getS3ArticleUrl.js?");

/***/ }),

/***/ "./utils/markdownUtils.js":
/*!********************************!*\
  !*** ./utils/markdownUtils.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar wrapTextIntoMarkdownCodeBlock = exports.wrapTextIntoMarkdownCodeBlock = function wrapTextIntoMarkdownCodeBlock(str, language) {\n  return \"```\" + language + \"\\n\" + str + \"\\n```\";\n};\n\n//# sourceURL=webpack:///./utils/markdownUtils.js?");

/***/ }),

/***/ "./utils/routeUtils.js":
/*!*****************************!*\
  !*** ./utils/routeUtils.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getItemIndexFromQueryString = exports.getContentUrlKey = undefined;\n\nvar _queryString = __webpack_require__(/*! query-string */ \"query-string\");\n\nvar _queryString2 = _interopRequireDefault(_queryString);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isNumeric = function isNumeric(n) {\n  return !isNaN(parseFloat(n)) && isFinite(n);\n};\n\nvar getContentUrlKey = exports.getContentUrlKey = function getContentUrlKey(params) {\n  var categoryKey = params.categoryKey,\n      subcategoryKey = params.subcategoryKey,\n      topicKey = params.topicKey;\n\n  var urlRoot = '/categories';\n  if (categoryKey) urlRoot += '/' + categoryKey;\n  if (subcategoryKey) urlRoot += '/' + subcategoryKey;\n  if (topicKey) urlRoot += '/' + topicKey;\n  return urlRoot;\n};\n\nvar getItemIndexFromQueryString = exports.getItemIndexFromQueryString = function getItemIndexFromQueryString(queryStr) {\n  var queryObj = _queryString2.default.parse(queryStr);\n  if (queryObj && queryObj.item && isNumeric(queryObj.item)) {\n    return parseInt(queryObj.item, 10);\n  }\n  return undefined;\n};\n\n//# sourceURL=webpack:///./utils/routeUtils.js?");

/***/ }),

/***/ "./utils/topicItemUtils.js":
/*!*********************************!*\
  !*** ./utils/topicItemUtils.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getTopicItemTypes = undefined;\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./utils/utils.js\");\n\nvar getTopicItemTypes = exports.getTopicItemTypes = function getTopicItemTypes(topicItems) {\n  var types = {};\n  topicItems.forEach(function (topicItem) {\n    types[topicItem.type] = true;\n  });\n\n  var topicItemTypes = [];\n  _utils.TOPIC_ITEM_TYPES.forEach(function (type) {\n    if (types[type]) {\n      topicItemTypes.push({\n        title: _utils.TOPIC_ITEM_TYPES_TITLE[type],\n        type: type\n      });\n    }\n  });\n\n  return topicItemTypes;\n};\n\n//# sourceURL=webpack:///./utils/topicItemUtils.js?");

/***/ }),

/***/ "./utils/utils.js":
/*!************************!*\
  !*** ./utils/utils.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar noop = exports.noop = function noop() {};\n\nvar TOPIC_ITEM_TYPES = exports.TOPIC_ITEM_TYPES = ['article', 'code', 'video', 'web-demo'];\n\nvar TOPIC_ITEM_TYPES_TITLE = exports.TOPIC_ITEM_TYPES_TITLE = {\n  article: 'Article',\n  code: 'Code',\n  video: 'Video',\n  'web-demo': 'Web Demo'\n};\n\n//# sourceURL=webpack:///./utils/utils.js?");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core%22?");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/styles\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/styles%22?");

/***/ }),

/***/ "bootstrap/dist/css/bootstrap.min.css":
/*!*******************************************************!*\
  !*** external "bootstrap/dist/css/bootstrap.min.css" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bootstrap/dist/css/bootstrap.min.css\");\n\n//# sourceURL=webpack:///external_%22bootstrap/dist/css/bootstrap.min.css%22?");

/***/ }),

/***/ "color":
/*!************************!*\
  !*** external "color" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"color\");\n\n//# sourceURL=webpack:///external_%22color%22?");

/***/ }),

/***/ "highlight.js":
/*!*******************************!*\
  !*** external "highlight.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"highlight.js\");\n\n//# sourceURL=webpack:///external_%22highlight.js%22?");

/***/ }),

/***/ "history/createBrowserHistory":
/*!***********************************************!*\
  !*** external "history/createBrowserHistory" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"history/createBrowserHistory\");\n\n//# sourceURL=webpack:///external_%22history/createBrowserHistory%22?");

/***/ }),

/***/ "marked":
/*!*************************!*\
  !*** external "marked" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"marked\");\n\n//# sourceURL=webpack:///external_%22marked%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"prop-types\");\n\n//# sourceURL=webpack:///external_%22prop-types%22?");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"query-string\");\n\n//# sourceURL=webpack:///external_%22query-string%22?");

/***/ }),

/***/ "rc-tabs":
/*!**************************!*\
  !*** external "rc-tabs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rc-tabs\");\n\n//# sourceURL=webpack:///external_%22rc-tabs%22?");

/***/ }),

/***/ "rc-tabs/assets/index.css":
/*!*******************************************!*\
  !*** external "rc-tabs/assets/index.css" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rc-tabs/assets/index.css\");\n\n//# sourceURL=webpack:///external_%22rc-tabs/assets/index.css%22?");

/***/ }),

/***/ "rc-tabs/lib/ScrollableInkTabBar":
/*!**************************************************!*\
  !*** external "rc-tabs/lib/ScrollableInkTabBar" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rc-tabs/lib/ScrollableInkTabBar\");\n\n//# sourceURL=webpack:///external_%22rc-tabs/lib/ScrollableInkTabBar%22?");

/***/ }),

/***/ "rc-tabs/lib/TabContent":
/*!*****************************************!*\
  !*** external "rc-tabs/lib/TabContent" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rc-tabs/lib/TabContent\");\n\n//# sourceURL=webpack:///external_%22rc-tabs/lib/TabContent%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-calendar-heatmap":
/*!*****************************************!*\
  !*** external "react-calendar-heatmap" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-calendar-heatmap\");\n\n//# sourceURL=webpack:///external_%22react-calendar-heatmap%22?");

/***/ }),

/***/ "react-chartjs-2":
/*!**********************************!*\
  !*** external "react-chartjs-2" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-chartjs-2\");\n\n//# sourceURL=webpack:///external_%22react-chartjs-2%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ }),

/***/ "react-md-spinner":
/*!***********************************!*\
  !*** external "react-md-spinner" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-md-spinner\");\n\n//# sourceURL=webpack:///external_%22react-md-spinner%22?");

/***/ }),

/***/ "react-particles-js":
/*!*************************************!*\
  !*** external "react-particles-js" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-particles-js\");\n\n//# sourceURL=webpack:///external_%22react-particles-js%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "react-router-hash-link":
/*!*****************************************!*\
  !*** external "react-router-hash-link" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-hash-link\");\n\n//# sourceURL=webpack:///external_%22react-router-hash-link%22?");

/***/ }),

/***/ "reactstrap":
/*!*****************************!*\
  !*** external "reactstrap" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reactstrap\");\n\n//# sourceURL=webpack:///external_%22reactstrap%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ })

/******/ });