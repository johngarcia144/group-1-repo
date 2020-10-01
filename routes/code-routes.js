const db = require("../models");

module.exports = function (app) {

  //route for adding code snips to DB.

  app.post("/api/codes/new", (req, res) => {
    db.Codes.create({
      snip: req.body.snip,
      codeType: req.body.codeType,
      public: req.body.public,
      title: req.body.title,
      keywords: req.body.keywords
    });
    res.status(204);
  });

  app.get("/api/codes/search/:keywords", (req, res) => {
    db.Codes.findAll({
      where: {
        keywords: req.params.keywords
      }
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
        keywords: req.body.keywords
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