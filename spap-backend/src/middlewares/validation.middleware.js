const {
  HTTP_STATUS
} = require("../shared/constants");




// ===============================
// Joi Validation Middleware
// ===============================
const validate = (schema, source = "body") => {


  return (req, res, next) => {


    try {


      let data;


      // Determine validation source
      switch (source) {

        case "params":
          data = req.params;
          break;


        case "query":
          data = req.query;
          break;


        case "body":
        default:
          data = req.body;
          break;

      }




      // Validate Data
      const {
        error,
        value
      } = schema.validate(
        data,
        {
          abortEarly: false,
          stripUnknown: true
        }
      );





      // Validation Failed
      if (error) {


        const errors = error.details.map(
          (detail) => ({

            field:
            detail.path.join("."),

            message:
            detail.message.replace(/"/g, "")

          })
        );



        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({

            success: false,

            message:
            "Validation failed",

            errors

          });

      }





      // Replace with validated data
      if (source === "params") {

        req.params = value;

      } 
      else if (source === "query") {

        req.query = value;

      } 
      else {

        req.body = value;

      }




      next();



    } catch(error) {

      next(error);

    }

  };

};




module.exports = {
  validate
};