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
    // let checked = req.cookies.id;
    // console.log('check:' + checked);
    
    // if (checked) {
    //   return res.redirect('/account/'+ checked);
    // }
      return res.view('./pages/login')
  },
  demo: async function (req,res) {
    console.log('demo');
    
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
      try {
        await User.create({
          email,
          password,
          name
        })
          .then(() => {
            console.log('vo then');

            res.redirect('/login');
          });
        console.log(User);


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
            req.session.userId = user.id
            res.cookie('id', user.id)
            res.redirect('/account/' + user.id)
            console.log(req.session.userId)


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
    let params = req.allParams();
    console.log('show account:' + res.session);
    console.log('cookie:' + req.cookies.id);

    var user = await User.findOne({ id: params.id })
    if (!user) {
      res.send('No user not found')
    }
    else {
      var question = await Question.find({ answer: '', users: params.id })
      var allAccount = await User.find()
      console.log(allAccount);

      res.view('./pages/homepage', { question: question, userId: user.id, allAccount: allAccount })
    }
  },
  showProfile: async function (req, res) {
    try {
      console.log('session:' + req.session.userId);

      let params = req.allParams();
      console.log(params);
      var UserHomepage = req.cookies.id;
      var user = await User.find({ id: params.id })
      var AnsQes = await Question.find({
        users: params.id, answer: {
          '!=': ''
        }
      })
      res.view('./pages/profile/', { AnsQes: AnsQes, user: user, UserHomepage: UserHomepage})
    } catch (error) {
      return console.log(error);

    }


  },

  /**
   * `UserController.handlePostAnswer()`
   */
  handlePostAnswer: async function (req, res) {
    try {

      let params = req.allParams();
      console.log(params);

      const updateAsk = await Question.update({ id: params.id }, { answer: params.answer }).fetch();
      res.redirect('/account/' + updateAsk[0].users)

    } catch (error) {
      return console.log(error);

    }

  },

  /**
   * `UserController.handleAddQuestion()`
   */
  handleAddQuestion: async function (req, res) {
    try {
      console.log('vo try');
      console.log(req.allParams());

      let params = req.allParams();
      var addQuestion = await Question.create({
        ask: params.ask,
        users: params.id,
      })
        .then(() => {
          res.redirect('/profile/' + params.id)
        })

    } catch (error) {
      return console.log(error);
    }


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

