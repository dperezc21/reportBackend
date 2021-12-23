
const getCompanyUserRepository = require( "./getCompanyUserService");
const generateCompanyCode = require( "./generateCompanyCodeService");
const deleteCompanyUserRepository = require( "./deleteCompanyUserService");
const insertCompanyRepository =require( "./insertCompanyService");
const updateCompanyUserRepository =require( "./updateCompanyUserService");

export = {
    getCompanyUserRepository,
    generateCompanyCode,
    deleteCompanyUserRepository,
    insertCompanyRepository,
    updateCompanyUserRepository
}