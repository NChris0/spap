const {
 generateToken
}=require("./jwt.service");


const {
 TOKEN_TYPE
}=require("../../shared/constants");





const generateAccessToken=(user)=>{


return generateToken(

{

 userId:user._id,

 role:user.role,

 club:user.club

},

"15m"

);


};






const generateRefreshToken=(user)=>{


return generateToken(

{

 userId:user._id,

 type:TOKEN_TYPE.REFRESH

},

"7d"

);


};





module.exports={
 generateAccessToken,
 generateRefreshToken
};