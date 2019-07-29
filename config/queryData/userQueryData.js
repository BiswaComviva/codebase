const conn = require('../database');
const queries = require('../queries/mysqlQueries');

async function checkLoggedIn (userid) {
    try {
        const rows  = await conn(queries.findUser,[ userid ])
        if(rows.length > 0) 
        {
            return { userid:rows[0].userid ,  phno:rows[0].msisdn };
        } else {
            return false;
        }
      } catch(err) {
          console.log(err);
      }
    }

    async function checkLogValidity (userid) {
        try {
            const result  = await conn(queries.findLoggingStatus,[ userid ])
            if(result[0].isLoggedIn)
                {
                    return true;
                } else {
                    return false;
                }
          } catch(err) {
              console.log(err);
          }
    }

    async function getAllUsers () {
        try {
            const rows  = await conn(queries.getUsers,[ userid ])
            if(rows.length > 0) 
            {
                return rows;
            } else {
                return false;
            }
          } catch(err) {
              console.log(err);
          }
        }
    
        async function insertUser (userid , username , msisdn , isLoggedIn) {
            try {
                const res  = await conn(queries.insertUser,[ userid , username , msisdn , isLoggedIn])
                if(res) 
                {
                    return true;
                } else {
                    return false;
                }
              } catch(err) {
                  console.log(err);
              }
            }
        
module.exports = {checkLoggedIn , checkLogValidity , getAllUsers , insertUser}    
