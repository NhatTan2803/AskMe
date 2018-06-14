/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
      required: true
    },

    img: { type: 'string' },

    questions: {
      collection: 'Question',
      via: 'users'
    },
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return cb(err);
        }
        if (hash) {
          user.password = hash;
          return cb(null, user);
        }
      });
    });
  },
  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
      if (err) {
        return cb(err);
      }
      if (match) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    });
  },
};

