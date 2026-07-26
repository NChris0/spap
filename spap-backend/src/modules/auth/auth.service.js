const User = require("../users/user.model")

const Role = require("../roles/role.model");
const Club = require("../clubs/club.model");


const {
 generateAccessToken,
 generateRefreshToken
}=require("./token.service");



// Register

const register = async(data)=>{


 const existingUser =
   await User.findOne({
     email:data.email
   });


 if(existingUser){

   const error=new Error(
    "Email already exists"
   );

   error.statusCode=400;

   throw error;

 }



 const role =
   await Role.findById(data.role);


 if(!role){

   const error=new Error(
    "Role not found"
   );

   error.statusCode=404;

   throw error;

 }




 if(data.club){

   const club =
    await Club.findById(data.club);


   if(!club){

    const error=new Error(
      "Club not found"
    );

    error.statusCode=404;

    throw error;

   }

 }



 const user =
   await User.create(data);



 const accessToken =
   generateAccessToken(user);



 const refreshToken =
   generateRefreshToken(user);



 return {

   user,

   accessToken,

   refreshToken

 };


};





// Login

const login = async(email,password)=>{


 const user =
 await User.findOne({email})
 .select("+password")
 .populate("role")
 .populate("club");



 if(!user){

   const error =
   new Error(
   "Invalid email or password"
   );

   error.statusCode=401;

   throw error;

 }



 const match =
 await user.comparePassword(password);



 if(!match){

   const error =
   new Error(
   "Invalid email or password"
   );

   error.statusCode=401;

   throw error;

 }




 user.lastLogin =
 new Date();


 await user.save();



 return {

 user,

 accessToken:
 generateAccessToken(user),

 refreshToken:
 generateRefreshToken(user)

 };


};





// Refresh Token

const refreshToken = async(token)=>{


 return {
   accessToken:
   token
 };


};



// Logout

const logout = async(token)=>{

 return true;

};



module.exports={
 register,
 login,
 refreshToken,
 logout
};