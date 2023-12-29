const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');
const Activity = require('./Activity.js');

const ActivityLog = sequelize.define('ActivityLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Activity,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    emoji: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { timestamps: false });

module.exports = ActivityLog;