const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


// Routes
const authRoutes = require("./modules/auth/auth.route");
const userRoutes = require("./modules/users/user.route");
const roleRoutes = require("./modules/roles/role.route");
const clubRoutes = require("./modules/clubs/club.route");


// Error Middleware
const {
  errorMiddleware
} = require("./middlewares/error.middleware");



const app = express();



// ===============================
// Global Middlewares
// ===============================

app.use(
  cors()
);


app.use(
  express.json()
);


app.use(
  express.urlencoded({
    extended:true
  })
);


app.use(
  morgan("dev")
);





// ===============================
// API Routes
// ===============================

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/users",
  userRoutes
);


app.use(
  "/api/roles",
  roleRoutes
);


app.use(
  "/api/clubs",
  clubRoutes
);





// ===============================
// Health Check
// ===============================

app.get(
  "/",
  (req,res)=>{

    res.json({

      success:true,

      message:
      "SPAP API is running"

    });

  }
);





// ===============================
// Error Handler
// MUST BE LAST
// ===============================

app.use(
  errorMiddleware
);



module.exports = app;