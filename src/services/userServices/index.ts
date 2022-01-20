
const deleteCompanyUserService = require('./deleteCompanyUserService')
const getCompanyUserService =require('./getCompanyUserService')
const updateCompanyUserService =require('./updateCompanyUserService')
const insertUserService =require('./insertUserService')
const login =require('./loginUserService')
const updateUserStatusService = require("./updateUserStatusService");


export = {
    
    deleteCompanyUserService,
    getCompanyUserService,
    updateCompanyUserService,
    insertUserService,
    login,
    updateUserStatusService
}