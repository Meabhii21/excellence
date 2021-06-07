const Candidate = require('../models/candidate');
const base64Id = require('base64id');
const TestScore = require('../models/testScore');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

exports.insertCandidate = async(req,res,next)=>{
    const candidateName = req.body.name;
    const emailId = req.body.emailId;

    Candidate.create({
        uid: base64Id.generateId(),
        name:candidateName,
        emailId:emailId
    }).then(async result=>{
        // console.log(result);
        return res.status(200).json({
            status:1,
            message:'Candidate Inserted Successfully',
            data:result
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            status:0,
            message:'someting went wrong'
        });
    }); 
}

exports.insertMarks=async(req,res,next)=>{
    const first_round=req.body.first_round;
    const second_round=req.body.second_round;
    const third_round=req.body.third_round;
    const candidateUid=req.body.candidateUid;
    const total_score = first_round+second_round+third_round;
    if(first_round<=10 && second_round<=10 && third_round<=10 && candidateUid!=null){
        TestScore.create({
            uid:base64Id.generateId(),
            first_round:first_round,
            second_round:second_round,
            third_round:third_round,
            candidateUid:candidateUid,
            total_score:total_score
        }).then(result=>{
            return res.status(200).json({
                status:1,
                message:'Scored Entered Successfully',
                data:result
            });
        }).catch(err=>{
            console.log(err);
            return res.status(200).json({
                status:0,
                message:'Something went wrong'
            }); 
        });
    }else{
        return res.status(500).json({
            status:0,
            message:'Inserted marks should be less than or equal to 10 & please select UID from http://localhost:3000/candidate/insert api'
        });
    }
}

exports.averageScore=async(req,res,next)=>{  
        TestScore.findAll({})
            .then(result=>{
                if(result.length>0){
                   const resultData = result.map(async data=>{{
                        const jsonData = JSON.parse(JSON.stringify(data));
                        var avg_score=data.first_round+data.second_round+data.third_round/3;
                        const candidateName = await Candidate.findAll({where:{uid:data.candidateUid}});
                        jsonData.avg_score=avg_score;
                        jsonData.name=candidateName[0].name;
                        delete jsonData.uid;
                        delete jsonData.first_round;
                        delete jsonData.second_round;
                        delete jsonData.third_round;
                        delete jsonData.createdAt;
                        delete jsonData.updatedAt;
                        delete jsonData.candidateUid;
                        return jsonData;
                    }})
                    return Promise.all(resultData).then(resultdata=>{
                        res.status(200).json({
                            status:1,
                            message:'Highest Scoring Candidate',
                            data:resultdata 
                        });
                    }
                    ).catch(err=>{
                        return res.status(500).json({
                            status:1,
                            msg:"Promise didn't return"
                        });
                    });
                }else{
                    return res.status(200).json({
                        status:1,
                        message:'Data not found'
                    });
                }
            }).catch(err=>{
                console.log(err);
                return res.status(500).json({
                    status:1,
                    message:'Something went wrong'
                });
            });
}

exports.highestScore=async(req,res,next)=>{
    TestScore.findOne({
        order:[['total_score','DESC']],
        attributes:['candidateUid','total_score']})
    .then(async result=>{
        if(result){
            const candidateName = await Candidate.findOne({where:{uid:result.candidateUid},attributes:['name']});
            return res.status(200).json({
                status:1,
                msg:'Highest Scoring candidate is:',
                data:candidateName
            });
        }else{
            return res.status(200).json({
                status:1,
                msg:'No data found'
            });
        }
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            status:0,
            msg:'Something went wrong'
        });
    });    
}