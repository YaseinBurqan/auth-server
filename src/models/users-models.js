'use strict';

const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('zz1', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({
          username: this.username
        }, process.env.SECRET);
      }
    }
  });

  model.beforeCreate=async function(user){
    let hashedPass = bcrypt.hash(user, 10);
    user = hashedPass;
    return user;
  };

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({
      username
    })
    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  }

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({where:{username: parsedToken.username}})
      if (user) {
        console.log("kkkkkkkkkkkkkkkkkkkkk");
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return model;
}

module.exports = userSchema;