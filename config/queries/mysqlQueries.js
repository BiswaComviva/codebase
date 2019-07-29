
const getUsers = "SELECT * FROM USERS";

const insertUser = "INSERT INTO USERS (userid , username , msisdn , isLoggedIn) VALUES (? , ? , ? , ?)";

const findUser = "SELECT * FROM USERS WHERE userid = ?";

const findLoggingStatus = "SELECT isLoggedIn FROM users WHERE userid = ?";

module.exports = {findUser , findLoggingStatus, getUsers  , insertUser};