// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const quotes = [
  "This is the code you’re looking for.",
  "Give a man a program, and you’ll frustrate him for a day. Teach a man to program, and you frustrate him for life.",
  "A misspelled variable will make your day terrible.",
  "A machine learning algorithm would jump off a cliff if everyone else was doing it.",
  "A few hours of trial and error can save precious minutes of looking at the README.",
  "If you don’t have time to do it right, you’ll make time to do it twice.",
  "Sometimes, the best debugger is a good night’s sleep.",
  "The best part of being a dev is the ability to work anywhere, anytime. The worst part of being a dev is also the ability to work anywhere, anytime.",
  "Debugger? I hardly know her!",
  "Yes, I’m asking if you’re a robot. I, too, am a robot.",
  "You're closer to becoming a millionaire than Jeff Bezos. Congrats!",
  "Your snippets are safe with us.",
  "It’s not a bug – it’s an undocumented feature.",
  "0110001001101111011011110110001001110011",
  "Documentation? We don’t need no stinking documentation!",
  "Things aren’t always #000000 and #FFFFFF",
  "If at first you don’t succeed; call it version 1.0",
  "Hi Class! It's me, Zoo Loop from Activity 18, Week 3. Never forget your roots. Giraffe.",
];

function newQuote() {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  return quotes[randomNumber];
}

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", { quote: newQuote() });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", { quote: newQuote() });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });
};
