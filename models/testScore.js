const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const TestScore = sequelize.define('testScore',{
    uid:{
        type:Sequelize.STRING(30),
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    first_round:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    second_round:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    third_round:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    total_score:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports=TestScore;