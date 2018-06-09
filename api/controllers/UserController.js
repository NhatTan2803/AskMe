/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `UserController.showLoginForm()`
   */
  showLoginForm: async function (req, res) {
    return res.view('./pages/login');
  },

  /**
   * `UserController.showSignUpForm()`
   */
  showSignUpForm: async function (req, res) {
    return res.view('./pages/signup')
  },

  /**
   * `UserController.handleSignUp()`
   */
  handleSignUp: async function (req, res) {
    let email = req.body.email,
      password = req.body.password,
      name = req.body.name;
    console.log(req.body.email);

    var Isemail = await User.findOne({ email });
    console.log(Isemail);

    if (!Isemail) {
      console.log('vo if');

      try {
        console.log('vo try');

        await User.create({
          email,
          password,
          name
        })
          .then(() => {
            console.log('vo then');

            res.redirect('/login');
          });
        console.log(user);


      } catch (error) {
        return console.log(error);

      }
    }
  },

  /**
   * `UserController.handleLogin()`
   */
  handleLogin: async function (req, res) {
    let email = req.body.email,
      password = req.body.password;
    console.log(email, password);

    try {
      console.log('vo try');

      var user = await User.findOne({ email });
      console.log(user);

      if (user) {
        console.log('vo if');

        User.comparePassword(password, user, (err, valid) => {
          if (valid) {
            req.session.id = user.id,
            res.redirect('/')  
          }
        })
      }
    } catch (error) {
      return console.log(error);

    }
  },

  /**
   * `UserController.showAccountForm()`
   */
  showAccountForm: async function (req, res) {
    return res.json({
      todo: 'showAccountForm() is not implemented yet!'
    });
  },

  /**
   * `UserController.handlePostAnswer()`
   */
  handlePostAnswer: async function (req, res) {
    return res.json({
      todo: 'handlePostAnswer() is not implemented yet!'
    });
  },

  /**
   * `UserController.handleAddQuestion()`
   */
  handleAddQuestion: async function (req, res) {
    return res.json({
      todo: 'handleAddQuestion() is not implemented yet!'
    });
  },

  /**
   * `UserController.handleLogout()`
   */
  handleLogout: async function (req, res) {
    return res.json({
      todo: 'handleLogout() is not implemented yet!'
    });
  },

  /**
   * `UserController.handleSearchFriend()`
   */
  handleSearchFriend: async function (req, res) {
    return res.json({
      todo: 'handleSearchFriend() is not implemented yet!'
    });
  }

};

