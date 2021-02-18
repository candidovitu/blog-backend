const lib = require('sequelize');

/**
 *
 * @param {lib.DataTypes} DataTypes 
 */

module.exports = (Sequelize, DataTypes) => {
    const Post = Sequelize.define('Post', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    });
    
    return Post;
}