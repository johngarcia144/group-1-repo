// Creating our Codes model
module.exports = function(sequelize, DataTypes) {
  const Codes = sequelize.define("Codes", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codeType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: false
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    snip: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Codes;
};
