var express = require("express");
const { response } = require("../app");
var router = express.Router();
var user = require("../helpers/user");




router.get("/sign",function(req,res){
  res.render("signup")
})






router.get("/", function (req, res) {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    res.render("login");
  }
});
router.get("/login", function (req, res) {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    res.render("login");
  }
});
router.get("/signup", (req, res) => {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    res.render("signup");
  }
});
router.get("/home", (req, res) => {
  let role = req.session.role
  let ifSession = req.session.name;
  if (ifSession) {
    if(role===1){
    res.render("home",{userName:ifSession,roles:role});
    }
    else{
      res.redirect('admin-home')
    }
  } else {
    res.render("login");
  }
});

router.post("/login", (req, res) => {
  let ifSession = req.session.name;
  let role = req.session.role
  if (ifSession) {
    if(role===0){
      res.redirect('admin-home')
    }
    else{
    res.render("home",{userName:ifSession,roles:role});
    }
  } else {
    user
      .userLogin(req.body)
      .then((response) => {
        req.session.name = response.user.name;
        req.session.role = response.user.role
        res.send({ user: true,roles:role });
      })
      .catch((response) => {
        res.send({ user: false,roles:role });
      });
  }
});

router.post("/signup", (req, res) => {
  
    user.userSignup(req.body).then((data) => {
      
      res.render('login')
   
    });
     
 
});

// logout

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
