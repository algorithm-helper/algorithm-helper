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
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./middleware/authentication.js":
/*!**************************************!*\
  !*** ./middleware/authentication.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar AccountDBUtils = __webpack_require__(/*! ../mongo/utils/accountsDBUtils */ \"./mongo/utils/accountsDBUtils.js\");\n\n/**\n * Authenticates the current user from the X-Auth header of the request, and\n * attempting to find a user in MongoDB with the given token.\n *\n * @param {Request} req\n * @param {Response} res\n * @param {Function} next\n */\nvar authenticateUser = function authenticateUser(req, res, next) {\n  var token = req.header('X-Auth');\n\n  AccountDBUtils.findUserByToken(token).then(function (user) {\n    if (!user) {\n      return Promise.reject(new Error('User does not exist'));\n    }\n\n    req.user = user;\n    req.token = token;\n    next();\n  }).catch(function (error) {\n    res.status(401).send(JSON.stringify({ error: error.message }));\n  });\n};\n\nmodule.exports = {\n  authenticateUser: authenticateUser\n};\n\n//# sourceURL=webpack:///./middleware/authentication.js?");

/***/ }),

/***/ "./mongo/models/Category.js":
/*!**********************************!*\
  !*** ./mongo/models/Category.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Category = mongoose.model('Category', {\n  key: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  slug: {\n    type: String,\n    required: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  colorKey: {\n    type: Number,\n    required: true\n  },\n  children: {\n    type: [String],\n    required: true\n  },\n  order: {\n    type: Number,\n    required: true\n  }\n}, 'Categories');\n\nmodule.exports = Category;\n\n//# sourceURL=webpack:///./mongo/models/Category.js?");

/***/ }),

/***/ "./mongo/models/Color.js":
/*!*******************************!*\
  !*** ./mongo/models/Color.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Color = mongoose.model('Color', {\n  key: {\n    type: Number,\n    required: true,\n    unique: true\n  },\n  hexCode: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  description: {\n    type: String\n  }\n}, 'Colors');\n\nmodule.exports = Color;\n\n//# sourceURL=webpack:///./mongo/models/Color.js?");

/***/ }),

/***/ "./mongo/models/Subcategory.js":
/*!*************************************!*\
  !*** ./mongo/models/Subcategory.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar Subcategory = mongoose.model('Subcategory', {\n  key: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  slug: {\n    type: String,\n    required: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  parent: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  imageUrl: {\n    type: String,\n    required: true,\n    validate: {\n      validator: validator.isURL,\n      message: '{VALUE} is an invalid url'\n    }\n  },\n  order: {\n    type: Number,\n    required: true\n  },\n  children: {\n    type: [String],\n    required: true\n  }\n}, 'Subcategories');\n\nmodule.exports = Subcategory;\n\n//# sourceURL=webpack:///./mongo/models/Subcategory.js?");

/***/ }),

/***/ "./mongo/models/Topic.js":
/*!*******************************!*\
  !*** ./mongo/models/Topic.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar Topic = mongoose.model('Topic', {\n  key: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  slug: {\n    type: String,\n    required: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  parent: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  order: {\n    type: Number,\n    required: true\n  },\n  children: [{\n    type: {\n      type: String,\n      required: true\n    },\n    resourceUrl: {\n      type: String,\n      validate: {\n        validator: validator.isURL,\n        message: '{VALUE} is an invalid url'\n      }\n    },\n    language: {\n      type: String\n    },\n    title: {\n      type: String\n    }\n  }]\n}, 'Topics');\n\nmodule.exports = Topic;\n\n//# sourceURL=webpack:///./mongo/models/Topic.js?");

/***/ }),

/***/ "./mongo/models/User.js":
/*!******************************!*\
  !*** ./mongo/models/User.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\nvar bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar MIN_FULL_NAME_LENGTH = 1;\nvar MIN_EMAIL_LENGTH = 1;\nvar MIN_PASSWORD_LENGTH = 8;\n\nvar UserSchema = new mongoose.Schema({\n  fullName: {\n    type: String,\n    required: true,\n    trim: true,\n    minlength: MIN_FULL_NAME_LENGTH\n  },\n  email: {\n    type: String,\n    required: true,\n    trim: true,\n    minlength: MIN_EMAIL_LENGTH,\n    unique: true,\n    validate: {\n      validator: validator.isEmail,\n      message: '{VALUE} is an invalid email'\n    }\n  },\n  password: {\n    type: String,\n    required: true,\n    minlength: MIN_PASSWORD_LENGTH\n  },\n  tokens: [{\n    access: {\n      type: String,\n      required: true\n    },\n    token: {\n      type: String,\n      required: true\n    }\n  }],\n  completedItems: [{\n    categoryKey: {\n      type: String,\n      required: true\n    },\n    subcategoryKey: {\n      type: String,\n      required: true\n    },\n    topicKey: {\n      type: String,\n      required: true\n    },\n    topicItemType: {\n      type: String,\n      required: true\n    },\n    dateCompleted: {\n      type: Number,\n      required: true\n    }\n  }],\n  bookmarks: [{\n    categoryKey: {\n      type: String,\n      required: true\n    },\n    subcategoryKey: {\n      type: String,\n      required: true\n    },\n    topicKey: {\n      type: String,\n      required: true\n    },\n    topicItemType: {\n      type: String,\n      required: true\n    },\n    dateBookmarked: {\n      type: Number,\n      required: true\n    }\n  }]\n});\n\nUserSchema.methods.toJSON = function () {\n  var user = this;\n  return _.pick(user.toObject(), ['_id', 'fullName', 'email']);\n};\n\nUserSchema.methods.generateAuthToken = function () {\n  var user = this;\n  var access = 'auth';\n  var token = jwt.sign({ _id: user._id.toHexString(), access: access }, 'abc123').toString();\n  user.tokens = user.tokens.concat([{ access: access, token: token }]);\n  return user.save().then(function () {\n    return token;\n  });\n};\n\nUserSchema.statics.findByToken = function (token) {\n  var User = this;\n  var decoded = void 0;\n\n  try {\n    decoded = jwt.verify(token, 'abc123');\n  } catch (err) {\n    return Promise.reject(err);\n  }\n\n  return User.findOne({\n    _id: decoded._id,\n    'tokens.token': token,\n    'tokens.access': 'auth'\n  });\n};\n\nUserSchema.statics.findByCredentials = function (email, password) {\n  var User = this;\n\n  return User.findOne({ email: email }).then(function (user) {\n    if (!user) {\n      return Promise.reject(new Error('User does not exist'));\n    }\n\n    return new Promise(function (resolve, reject) {\n      bcrypt.compare(password, user.password, function (err, res) {\n        if (res) {\n          resolve(user);\n        } else {\n          reject(err);\n        }\n      });\n    });\n  });\n};\n\nUserSchema.pre('save', function (next) {\n  var user = this;\n\n  if (user.isModified('password')) {\n    bcrypt.genSalt(10, function (err, salt) {\n      bcrypt.hash(user.password, salt, function (err, hash) {\n        user.password = hash;\n        next();\n      });\n    });\n  } else {\n    next();\n  }\n});\n\nvar User = mongoose.model('User', UserSchema, 'Users');\n\nmodule.exports = User;\n\n//# sourceURL=webpack:///./mongo/models/User.js?");

/***/ }),

/***/ "./mongo/utils/accountsDBUtils.js":
/*!****************************************!*\
  !*** ./mongo/utils/accountsDBUtils.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar User = __webpack_require__(/*! ../models/User */ \"./mongo/models/User.js\");\n\n/**\n * Creates a new User with the given parameters.\n *\n * @param {string} fullName\n * @param {string} email\n * @param {string} password\n */\nvar signupNewUser = function signupNewUser(fullName, email, password) {\n  var user = new User({ fullName: fullName, email: email, password: password });\n  return user.save().then(function () {\n    return user.generateAuthToken();\n  }).then(function (token) {\n    return { user: user, token: token };\n  });\n};\n\n/**\n * Returns a Promise to find a user in MongoDB with the given token.\n *\n * @param {string} token\n */\nvar findUserByToken = function findUserByToken(token) {\n  return User.findByToken(token);\n};\n\n/**\n * Returns a Promise that finds the User with the given email and password\n * credentials, otherwise rejects with an error.\n *\n * @param {string} email\n * @param {string} password\n */\nvar findUserByCredentials = function findUserByCredentials(email, password) {\n  var currentUser = void 0;\n  return User.findByCredentials(email, password).then(function (user) {\n    currentUser = user;\n    return user.generateAuthToken();\n  }).then(function (token) {\n    return { user: currentUser, token: token };\n  });\n};\n\nmodule.exports = {\n  signupNewUser: signupNewUser,\n  findUserByToken: findUserByToken,\n  findUserByCredentials: findUserByCredentials\n};\n\n//# sourceURL=webpack:///./mongo/utils/accountsDBUtils.js?");

/***/ }),

/***/ "./mongo/utils/categoryDBUtils.js":
/*!****************************************!*\
  !*** ./mongo/utils/categoryDBUtils.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Category = __webpack_require__(/*! ../models/Category */ \"./mongo/models/Category.js\");\nvar Subcategory = __webpack_require__(/*! ../models/Subcategory */ \"./mongo/models/Subcategory.js\");\nvar Topic = __webpack_require__(/*! ../models/Topic */ \"./mongo/models/Topic.js\");\n\n/**\n * Gets all of the category data from MongoDB.\n */\nvar getCategoryData = function getCategoryData() {\n  return Category.find({}, {\n    key: true,\n    slug: true,\n    title: true,\n    description: true,\n    colorKey: true,\n    order: true,\n    children: true\n  }).lean().exec().then(function (result) {\n    return result.sort(function (a, b) {\n      return a.order - b.order;\n    });\n  });\n};\n\n/**\n * Gets the category data for a specific category by key from MongoDB.\n *\n * @param {string} categoryKey\n */\nvar getCategoryDataByKey = function getCategoryDataByKey(categoryKey) {\n  return Category.findOne({\n    key: categoryKey\n  }, {\n    key: true,\n    slug: true,\n    title: true,\n    description: true,\n    colorKey: true,\n    order: true,\n    children: true\n  }).lean().exec();\n};\n\n/**\n * Gets all of the category data with the data of its children from MongoDB.\n */\nvar getCategoryDataExtended = function getCategoryDataExtended() {\n  return Promise.all([Category.find({}, {\n    key: true,\n    slug: true,\n    title: true,\n    description: true,\n    colorKey: true,\n    order: true\n  }).lean().exec(), Subcategory.find({}, {\n    key: true,\n    slug: true,\n    title: true,\n    parent: true,\n    description: true,\n    imageUrl: true,\n    order: true\n  }).lean().exec()]).then(function (result) {\n    var _result = _slicedToArray(result, 2),\n        categoryData = _result[0],\n        subcategoryData = _result[1];\n\n    var mapCategoryKeyToIndex = categoryData.map(function (category, i) {\n      return {\n        slug: category.slug,\n        index: i\n      };\n    }).reduce(function (prev, curr) {\n      return _extends({}, prev, _defineProperty({}, curr.slug, curr.index));\n    }, {});\n\n    subcategoryData.forEach(function (subcategory) {\n      var index = mapCategoryKeyToIndex[subcategory.parent];\n\n      if (!categoryData[index].children) {\n        categoryData[index].children = [];\n      }\n\n      categoryData[index].children.push(subcategory);\n    });\n\n    categoryData.forEach(function (category) {\n      category.children = category.children.sort(function (a, b) {\n        return a.order - b.order;\n      });\n    });\n\n    return categoryData.sort(function (a, b) {\n      return a.order - b.order;\n    });\n  });\n};\n\n/**\n * Gets the category data for a specific category by key with the data of its children from MongoDB.\n *\n * @param {string} categoryKey\n */\nvar getCategoryDataByKeyExtended = function getCategoryDataByKeyExtended(categoryKey) {\n  return Promise.all([Category.findOne({\n    key: categoryKey\n  }, {\n    key: true,\n    slug: true,\n    title: true,\n    description: true,\n    colorKey: true,\n    order: true\n  }).lean().exec(), Subcategory.find({\n    parent: categoryKey\n  }, {\n    key: true,\n    slug: true,\n    title: true,\n    parent: true,\n    description: true,\n    imageUrl: true,\n    order: true\n  }).lean().exec()]).then(function (result) {\n    var _result2 = _slicedToArray(result, 2),\n        categoryData = _result2[0],\n        subcategoryData = _result2[1];\n\n    categoryData.children = subcategoryData.sort(function (a, b) {\n      return a.order - b.order;\n    });\n    return categoryData;\n  });\n};\n\n/**\n * Gets all of the category data by key and colorKey from MongoDB.\n */\nvar getCategoryColorKeyMapping = function getCategoryColorKeyMapping() {\n  return Category.find({}, {\n    key: true,\n    colorKey: true\n  }).lean().exec().then(function (result) {\n    return result.reduce(function (prev, curr) {\n      return _extends({}, prev, _defineProperty({}, curr.key, curr.colorKey));\n    }, {});\n  });\n};\n\nmodule.exports = {\n  getCategoryData: getCategoryData,\n  getCategoryDataByKey: getCategoryDataByKey,\n  getCategoryDataExtended: getCategoryDataExtended,\n  getCategoryDataByKeyExtended: getCategoryDataByKeyExtended,\n  getCategoryColorKeyMapping: getCategoryColorKeyMapping\n};\n\n//# sourceURL=webpack:///./mongo/utils/categoryDBUtils.js?");

/***/ }),

/***/ "./mongo/utils/colorDBUtils.js":
/*!*************************************!*\
  !*** ./mongo/utils/colorDBUtils.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Color = __webpack_require__(/*! ../models/Color */ \"./mongo/models/Color.js\");\n\n/**\n * Gets all the color data from MongoDB.\n */\nvar getColorData = function getColorData() {\n  return Color.find({}, {\n    key: true,\n    hexCode: true,\n    description: true\n  }).lean().exec();\n};\n\nmodule.exports = {\n  getColorData: getColorData\n};\n\n//# sourceURL=webpack:///./mongo/utils/colorDBUtils.js?");

/***/ }),

/***/ "./mongo/utils/dbUtils.js":
/*!********************************!*\
  !*** ./mongo/utils/dbUtils.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar MONGO_URL = process.env.MLAB_MONGO_URL || 'mongodb://localhost:27017/AlgorithmHelper';\nvar DB_NAME = 'AlgorithmHelper';\nvar CATEGORIES_COLLECTION_NAME = 'Categories';\nvar SUBCATEGORIES_COLLECTION_NAME = 'Subcategories';\nvar TOPICS_COLLECTION_NAME = 'Topics';\nvar COLORS_COLLECTION_NAME = 'Colors';\n\nmodule.exports = {\n  MONGO_URL: MONGO_URL,\n  DB_NAME: DB_NAME,\n  CATEGORIES_COLLECTION_NAME: CATEGORIES_COLLECTION_NAME,\n  SUBCATEGORIES_COLLECTION_NAME: SUBCATEGORIES_COLLECTION_NAME,\n  TOPICS_COLLECTION_NAME: TOPICS_COLLECTION_NAME,\n  COLORS_COLLECTION_NAME: COLORS_COLLECTION_NAME\n};\n\n//# sourceURL=webpack:///./mongo/utils/dbUtils.js?");

/***/ }),

/***/ "./mongo/utils/setupMongoose.js":
/*!**************************************!*\
  !*** ./mongo/utils/setupMongoose.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _require = __webpack_require__(/*! ./dbUtils */ \"./mongo/utils/dbUtils.js\"),\n    MONGO_URL = _require.MONGO_URL;\n\nvar log = __webpack_require__(/*! ../../utils/log */ \"./utils/log.js\");\n\n/**\n * Setups Mongoose connection to MongoDB with connected/disconnected event listeners. Disconnects\n * when the Node.js application is closed with SIGINT.\n */\nvar setupMongoose = function setupMongoose() {\n  mongoose.connect(MONGO_URL, { useNewUrlParser: true });\n\n  mongoose.connection.on('connected', function () {\n    log.info('Mongoose connected');\n  });\n\n  mongoose.connection.on('disconnected', function () {\n    log.info('Mongoose disconnected');\n  });\n\n  process.on('SIGINT', function () {\n    mongoose.connection.close(function () {\n      log.info('Mongoose connection closed');\n      process.exit(0);\n    });\n  });\n\n  process.on('exit', function () {\n    mongoose.connection.close(function () {\n      log.info('Mongoose connection closed');\n      process.exit(0);\n    });\n  });\n};\n\nmodule.exports = setupMongoose;\n\n//# sourceURL=webpack:///./mongo/utils/setupMongoose.js?");

/***/ }),

/***/ "./mongo/utils/subcategoryDBUtils.js":
/*!*******************************************!*\
  !*** ./mongo/utils/subcategoryDBUtils.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar Subcategory = __webpack_require__(/*! ../models/Subcategory */ \"./mongo/models/Subcategory.js\");\nvar Topic = __webpack_require__(/*! ../models/Topic */ \"./mongo/models/Topic.js\");\n\n/**\n * Gets all of the subcategory data from MongoDB.\n */\nvar getSubcategoryData = function getSubcategoryData() {\n  return Subcategory.find({}, {\n    key: true,\n    slug: true,\n    title: true,\n    parent: true,\n    description: true,\n    imageUrl: true,\n    order: true,\n    children: true\n  }).lean().exec().then(function (result) {\n    return result.sort(function (a, b) {\n      return a.order - b.order;\n    });\n  });\n};\n\n/**\n * Gets the subcategory data for a specific subcategory by key from MongoDB.\n *\n * @param {string} categoryKey\n * @param {string} subcategoryKey\n */\nvar getSubcategoryDataByKey = function getSubcategoryDataByKey(categoryKey, subcategoryKey) {\n  return Subcategory.findOne({\n    key: categoryKey + '/' + subcategoryKey\n  }, {\n    key: true,\n    slug: true,\n    title: true,\n    parent: true,\n    description: true,\n    imageUrl: true,\n    order: true,\n    children: true\n  }).lean().exec();\n};\n\n/**\n * Gets the subcategory data for a specific subcategory by key with the data of its children from\n * MongoDB.\n *\n * @param {string} categoryKey\n * @param {string} subcategoryKey\n */\nvar getSubcategoryDataByKeyExtended = function getSubcategoryDataByKeyExtended(categoryKey, subcategoryKey) {\n  return Promise.all([Subcategory.findOne({\n    key: categoryKey + '/' + subcategoryKey\n  }, {\n    key: true,\n    slug: true,\n    title: true,\n    parent: true,\n    description: true,\n    imageUrl: true,\n    order: true\n  }).lean().exec(), Topic.find({\n    parent: subcategoryKey\n  }, {\n    key: true,\n    slug: true,\n    title: true,\n    parent: true,\n    description: true,\n    order: true\n  }).lean().exec()]).then(function (result) {\n    var _result = _slicedToArray(result, 2),\n        subcategoryData = _result[0],\n        topicData = _result[1];\n\n    subcategoryData.children = topicData.sort(function (a, b) {\n      return a.order - b.order;\n    });\n    return subcategoryData;\n  });\n};\n\nmodule.exports = {\n  getSubcategoryData: getSubcategoryData,\n  getSubcategoryDataByKey: getSubcategoryDataByKey,\n  getSubcategoryDataByKeyExtended: getSubcategoryDataByKeyExtended\n};\n\n//# sourceURL=webpack:///./mongo/utils/subcategoryDBUtils.js?");

/***/ }),

/***/ "./mongo/utils/topicDBUtils.js":
/*!*************************************!*\
  !*** ./mongo/utils/topicDBUtils.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Topic = __webpack_require__(/*! ../models/Topic */ \"./mongo/models/Topic.js\");\n\n/**\n * Gets the topic data for a specific topic by key from MongoDB.\n *\n * @param {string} categoryKey\n * @param {string} subcategoryKey\n * @param {string} topicKey\n */\nvar getTopicDataByKey = function getTopicDataByKey(categoryKey, subcategoryKey, topicKey) {\n  return Topic.findOne({\n    key: categoryKey + '/' + subcategoryKey + '/' + topicKey\n  }, {\n    key: true,\n    slug: true,\n    title: true,\n    parent: true,\n    description: true,\n    order: true,\n    children: true\n  }).lean().exec();\n};\n\nmodule.exports = {\n  getTopicDataByKey: getTopicDataByKey\n};\n\n//# sourceURL=webpack:///./mongo/utils/topicDBUtils.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar app = express();\n\n// MongoDB Utils:\nvar CategoryDBUtils = __webpack_require__(/*! mongo/utils/categoryDBUtils */ \"./mongo/utils/categoryDBUtils.js\");\nvar SubcategoryDBUtils = __webpack_require__(/*! mongo/utils/subcategoryDBUtils */ \"./mongo/utils/subcategoryDBUtils.js\");\nvar TopicDBUtils = __webpack_require__(/*! ./mongo/utils/topicDBUtils */ \"./mongo/utils/topicDBUtils.js\");\nvar ColorDBUtils = __webpack_require__(/*! ./mongo/utils/colorDBUtils */ \"./mongo/utils/colorDBUtils.js\");\nvar AccountDBUtils = __webpack_require__(/*! ./mongo/utils/accountsDBUtils */ \"./mongo/utils/accountsDBUtils.js\");\nvar setupMongoose = __webpack_require__(/*! ./mongo/utils/setupMongoose */ \"./mongo/utils/setupMongoose.js\");\n\n// Startup Scripts:\n// const initMongo = require('../../scripts/initMongo');\n\n// Middleware:\n\nvar _require = __webpack_require__(/*! ./middleware/authentication */ \"./middleware/authentication.js\"),\n    authenticateUser = _require.authenticateUser;\n\n// Utils:\n\n\nvar log = __webpack_require__(/*! ./utils/log */ \"./utils/log.js\");\nvar cors = __webpack_require__(/*! ./utils/cors */ \"./utils/cors.js\");\n\nvar publicPath = path.join(__dirname, '..', 'public');\nvar port = process.env.PORT || 5000;\n\napp.use(cors);\napp.use(express.static(publicPath));\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(session({\n  secret: '<Algorithm Helper Secret>',\n  resave: false,\n  saveUninitialized: true,\n  cookie: {\n    secure: false\n  }\n}));\n\nsetupMongoose();\n\nif (process.env.PRODUCTION) {\n  // initMongo({ silent: true });\n}\n\napp.listen(port, function () {\n  log.info('Server started on port ' + port);\n});\n\n/**\n * POST /accounts/login\n * Logs user in with the given credentials.\n *\n * @param {string} email\n * @param {string} password\n */\napp.post('/accounts/login', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  var _req$body = req.body,\n      email = _req$body.email,\n      password = _req$body.password;\n\n  AccountDBUtils.findUserByCredentials(email, password).then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    var user = data.user,\n        token = data.token;\n\n    res.header('X-Auth', token).status(200).send(JSON.stringify({ data: user }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: 'Invalid login credentials' }));\n  });\n});\n\n/**\n * POST /accounts/sign-up\n * Registers user with the given information.\n *\n * @param {string} fullName\n * @param {string} email\n * @param {string} password\n */\napp.post('/accounts/sign-up', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  var _req$body2 = req.body,\n      fullName = _req$body2.fullName,\n      email = _req$body2.email,\n      password = _req$body2.password;\n\n\n  AccountDBUtils.signupNewUser(fullName, email, password).then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    var user = data.user,\n        token = data.token;\n\n    res.header('X-Auth', token).status(200).send(JSON.stringify({ data: user }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error }));\n  });\n});\n\n/**\n * POST /accounts/user\n * Returns the current user object if the request headers contains a valid token, otherwise\n * returns an error response.\n */\napp.post('/accounts/user', authenticateUser, function (req, res) {\n  res.send(req.user);\n});\n\n/**\n * GET /actions/get-item-completed\n * Returns true/false based on whether the currently logged in user has the item as completed. If\n * no user is logged in, then returns an error response.\n *\n * @param {string} topicItemKey\n * @param {string} authKey\n */\napp.get('/actions/get-item-completed', function (req, res) {\n  // TODO\n});\n\n/**\n * GET /actions/get-item-bookmarked\n * Returns true/false based on whether the currently logged in user has the item as bookmarked. If\n * no user is logged in, then returns an error response.\n *\n * @param {string} topicItemKey\n * @param {string} authKey\n */\napp.get('/actions/get-item-bookmarked', function (req, res) {\n  // TODO\n});\n\n/**\n * POST /actions/mark-as-completed\n * Toggles the completion for this current item for the currently logged in user. If no user\n * is logged in, then returns an error response.\n *\n * @param {string} topicItemKey\n * @param {string} authKey\n *\n */\napp.post('/actions/mark-as-completed', function (req, res) {\n  // TODO\n});\n\n/**\n * POST /actions/save-to-bookmarks\n * Adds or removes the bookmark for this current item for the currently logged in user. If no user\n * is logged in, then returns an error response.\n *\n * @param {string} topicItemKey\n * @param {string} authKey\n */\napp.post('/actions/save-to-bookmarks', function (req, res) {\n  // TODO\n});\n\n/**\n * GET /data/categories\n * Gets all of the category data from MongoDB.\n */\napp.get('/data/categories', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  CategoryDBUtils.getCategoryData().then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/subcategories\n * Gets all of the subcategory data from MongoDB.\n */\napp.get('/data/subcategories', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  SubcategoryDBUtils.getSubcategoryData().then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/categories/:categoryKey\n * Gets the category data for a specific category by key from MongoDB.\n *\n * @param {string} categoryKey\n */\napp.get('/data/categories/:categoryKey', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  var categoryKey = req.params.categoryKey;\n\n  CategoryDBUtils.getCategoryDataByKey(categoryKey).then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/categories/:categoryKey/:subcategoryKey\n * Gets the subcategory data for a specific subcategory by key from MongoDB.\n *\n * @param {string} categoryKey\n * @param {string} subcategoryKey\n */\napp.get('/data/categories/:categoryKey/:subcategoryKey', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  var _req$params = req.params,\n      categoryKey = _req$params.categoryKey,\n      subcategoryKey = _req$params.subcategoryKey;\n\n  SubcategoryDBUtils.getSubcategoryDataByKey(categoryKey, subcategoryKey).then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/categories/:categoryKey/:subcategoryKey/:topicKey\n * Gets the topic data for a specific topic by key from MongoDB.\n *\n * @param {string} categoryKey\n * @param {string} subcategoryKey\n * @param {string} topicKey\n */\napp.get('/data/categories/:categoryKey/:subcategoryKey/:topicKey', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  var _req$params2 = req.params,\n      categoryKey = _req$params2.categoryKey,\n      subcategoryKey = _req$params2.subcategoryKey,\n      topicKey = _req$params2.topicKey;\n\n  TopicDBUtils.getTopicDataByKey(categoryKey, subcategoryKey, topicKey).then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/colors\n * Gets all the color data from MongoDB.\n */\napp.get('/data/colors', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  ColorDBUtils.getColorData().then(function (data) {\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/extended/categories\n * Gets all of the category data with the data of its children, from MongoDB.\n */\napp.get('/data/extended/categories', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  CategoryDBUtils.getCategoryDataExtended().then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/extended/categories/:categoryKey\n * Gets the category data for a particular category with the data of its children, from MongoDB.\n *\n * @param {string} categoryKey\n */\napp.get('/data/extended/categories/:categoryKey', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  var categoryKey = req.params.categoryKey;\n\n  CategoryDBUtils.getCategoryDataByKeyExtended(categoryKey).then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/extended/categories/:categoryKey/:subcategoryKey\n * Gets the subcategory data for a particular subcategory with the data of its children, from\n * MongoDB.\n *\n * @param {string} categoryKey\n * @param {string} subcategoryKey\n */\napp.get('/data/extended/categories/:categoryKey/:subcategoryKey', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  var _req$params3 = req.params,\n      categoryKey = _req$params3.categoryKey,\n      subcategoryKey = _req$params3.subcategoryKey;\n\n  SubcategoryDBUtils.getSubcategoryDataByKeyExtended(categoryKey, subcategoryKey).then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error.message }));\n  });\n});\n\n/**\n * GET /data/utils/categories-color-key-mapping\n * Gets the mapping of categoryKey to colorKey, from MongoDB.\n */\napp.get('/data/utils/categories-color-key-mapping', function (req, res) {\n  res.setHeader('Content-Type', 'application/json');\n\n  CategoryDBUtils.getCategoryColorKeyMapping().then(function (data) {\n    if (data === null) {\n      res.status(400).send(JSON.stringify({ error: 'Invalid request' }));\n      return;\n    }\n\n    res.status(200).send(JSON.stringify({ data: data }));\n  }).catch(function (error) {\n    res.status(400).send(JSON.stringify({ error: error }));\n  });\n});\n\n/**\n * GET *\n * For all other routes, defaults to the index page of the Algorithm Helper\n * website.\n */\napp.get('*', function (req, res) {\n  res.sendFile(path.join(publicPath, 'index.html'));\n});\n\nmodule.exports = app;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ "./utils/cors.js":
/*!***********************!*\
  !*** ./utils/cors.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Express middleware to set correct headers to provide cross-origin resource sharing (CORS)\n * support.\n *\n * @param {Request} req\n * @param {Response} res\n * @param {Function} next\n */\nvar cors = function cors(req, res, next) {\n  res.header('Access-Control-Allow-Origin', '*');\n  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');\n  next();\n};\n\nmodule.exports = cors;\n\n//# sourceURL=webpack:///./utils/cors.js?");

/***/ }),

/***/ "./utils/log.js":
/*!**********************!*\
  !*** ./utils/log.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bunyan = __webpack_require__(/*! bunyan */ \"bunyan\");\n\nmodule.exports = bunyan.createLogger({\n  name: 'AlgorithmHelper',\n  level: 'debug'\n});\n\n//# sourceURL=webpack:///./utils/log.js?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "bunyan":
/*!*************************!*\
  !*** external "bunyan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bunyan\");\n\n//# sourceURL=webpack:///external_%22bunyan%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

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