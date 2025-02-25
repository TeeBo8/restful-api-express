const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'articles',
  timestamps: true
});

// Définir la relation entre User et Article
User.hasMany(Article, { foreignKey: 'user_id', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Article;