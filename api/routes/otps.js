const express = require("express");
const otpGen = require("../../processes/otp/otpGen");
const queries = require('../../config/queries/mysqlQueries');
const queriesData = require('../../config/queryData/userQueryData');
const conn = require('../../config/database');
const otprouter = express.Router();

otprouter.post('/' ,  async (req,res,next) =>  {

    const otpObj = new otpGen();
    var status ;
    var validity=true;
    const { userid , phno } =  await queriesData.checkLoggedIn(req.body.userid)

    if(phno){
    
    const  valid = await queriesData.checkLogValidity(req.body.userid);

    if(valid == false){
    otpObj.createOTP('91'+phno);
    
        res.status(200).json({
            message: "OTP GENERATED IS GIVEN TO FOLLOWING NUMBER",
            userid:userid,
            phno:phno
        });
    } else {
        res.status(200).json({
            message: "USER IS ALREADY LOGGED IN ",
        });
    }
    }else {
        res.status(200).json({
            message: "USER NOT REGISTERED "
        });
    }
    });


otprouter.post('/:otpId' , (req,res,next) => {
    
    const otpObj = new otpGen();
    const id = req.params.otpId

    const isvalid = otpObj.ValidateOTP(id);
    console.log(isvalid);
    if(isvalid == false) {
       res.status(200).json({
           message: "Please enter valid OTP"
       });
    } else {
        res.status(200).json({
            message: "You have entered correct OTP"
        })
    }
   
});

module.exports = otprouter;