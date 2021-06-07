const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Candidate =  sequelize.define('candidate',{
    uid:{
        type:Sequelize.STRING(50),
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    name:{
        type:Sequelize.STRING(30),
        defaultValue:"",
        allowNull:true,
    },
    emailId:{
        type:Sequelize.STRING(50),
        defaultValue:"",
        allowNull:true
    }
});

 module.exports=Candidate;