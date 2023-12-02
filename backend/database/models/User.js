const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');



const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }  
}, {timestamps: false});

  // Hash the password before saving the teacher
  User.beforeCreate(async (teacher) => {
    const hashedPassword = await bcrypt.hash(teacher.password, 10);
    teacher.password = hashedPassword;
  });

  // Verify the password for login
  User.prototype.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  module.exports = User;
