const lib = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {lib.DataTypes} DataTypes 
 */

module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
    },
    {
        hooks: {
            beforeSave: async user => {
                if(user.password) user.password_hash = await bcrypt.hash(user.password, 8);
            }
        }
    }
    );

    User.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash);
    }

    User.prototype.generateToken = function() {
        return jwt.sign({
            id: this.id
        }, process.env.SECRET_TOKEN);
    }
    
    return User;
}