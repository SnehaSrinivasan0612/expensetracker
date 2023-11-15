module.exports = (sequelize, Sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    UserName: DataTypes.STRING(100),
    UserEmail: DataTypes.STRING(100),
    PasswordHash: DataTypes.STRING(100)
  });
  const Categories = sequelize.define("categories", {
    CategoryName: DataTypes.STRING(100)
  });
  const Expenses = sequelize.define("expenses", {
    UserID: DataTypes.INTEGER,
    CategoryID: DataTypes.INTEGER,
    Amount: DataTypes.DECIMAL(10, 2),
    ExpenseDescription: DataTypes.STRING(200),
    ExpenseDate: DataTypes.DATE
  });
  Users.hasMany(Expenses, { foreignKey: 'UserID' });
  Users.hasOne(Expenses, {
    onDelete: "CASCADE"
  });
  Categories.hasMany(Expenses, { foreignKey: 'CategoryID' });
  Expenses.belongsTo(Users, { foreignKey: 'id' });
  Expenses.belongsTo(Categories, { foreignKey: 'id' });
  return {
    Expenses, Users, Categories
  };
};
