// Creating our Codes model
module.exports = function(sequelize, DataTypes) {
  const Codes = sequelize.define("Codes", {
    userId: {
      type: DataTypes.INT,
      allowNull: false
    },
    codeType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tags: {
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
    }
  });
  return Codes;
};
