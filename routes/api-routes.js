// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email, username, and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  //route for adding code snips to DB.
  app.get("/api/codes/:snip", (req, res) => {
    db.Codes.create({
      snip: req.body.snip,
      codeType: req.body.codeType,
      public: req.body.public,
      title: req.body.title,
      keywords: req.body.keywords
    }).then(dbCodes => {
      res.json(dbCodes);
    });
  });

  app.delete("/api/codes/:id", (req, res) => {
    // We just have to specify which todo we want to destroy with "where"
    db.Codes.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbCodes => {
      res.json(dbCodes);
    });
  });
  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/codes", (req, res) => {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Codes.update(
      {
        snip: req.body.snip,
        codeType: req.body.codeType,
        public: req.body.public,
        title: req.body.title,
        tags: req.body.tags
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(dbCodes => {
      res.json(dbCodes);
    });
  });
};
