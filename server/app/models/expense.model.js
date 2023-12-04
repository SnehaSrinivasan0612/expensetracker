module.exports = (sequelize, Sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    UserName: DataTypes.STRING(100),
    UserEmail: DataTypes.STRING(100),
    PasswordHash: DataTypes.STRING(100)
  });
  const Expenses = sequelize.define("expenses", {
    UserID: DataTypes.INTEGER,
    Amount: DataTypes.DECIMAL(10, 2),
    ExpenseDescription: DataTypes.STRING(200),
    ExpenseDate: DataTypes.DATE,
    CategoryName: DataTypes.STRING(100)
  });
  Users.hasMany(Expenses, { foreignKey: 'UserID' });
  //Expenses.belongsTo(Users, { foreignKey: 'id', onDelete: "CASCADE" });
  return {
    Expenses, Users
  };
};
