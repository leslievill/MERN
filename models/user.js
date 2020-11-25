var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },

  restaurant:[
    {
      name: String,
      url: String,
      imgurl: String,
      rating: String,
      category: String
    }
  ],
  event: [
    {
      name: String,
      description: String,
      siteurl: String,
      img: String,
      start: String
    }
  ],
  list: [String]
}, {usePushEach: true}); // Must have this in order to use push with this version of mongo
// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name,
      restaurant: ret.restaurant,
      event: ret.event,
      list: ret.list
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compareSync(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

// Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
  var hash = bcrypt.hashSync(this.password, 10);
  // store the hash as the user's password
  this.password = hash;
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;