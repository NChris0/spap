const authService = require("./auth.service");

const { HTTP_STATUS } = require("../../shared/constants");


// Register Controller
const register = async (req, res, next) => {
  try {

    const result = await authService.register(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error) {
    next(error);
  }
};



// Login Controller
const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const result = await authService.login(
      email,
      password
    );


    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful",
      data: result,
    });


  } catch (error) {
    next(error);
  }
};



// Refresh Token
const refreshToken = async (req,res,next)=>{

  try {

    const result =
      await authService.refreshToken(req.body.refreshToken);


    return res.status(HTTP_STATUS.OK).json({
      success:true,
      message:"Token refreshed successfully",
      data:result
    });


  } catch(error){
    next(error);
  }

};



// Logout
const logout = async(req,res,next)=>{

 try{

   await authService.logout(req.body.refreshToken);


   return res.status(HTTP_STATUS.OK).json({
     success:true,
     message:"Logout successful"
   });


 }catch(error){
   next(error);
 }

};



module.exports = {
  register,
  login,
  refreshToken,
  logout
};