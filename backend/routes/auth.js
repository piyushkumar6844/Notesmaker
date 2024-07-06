const mongoose = require('mongoose');
const express = require('express')
const router=express.Router();
const User=require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userfetching = require('../middleware/userfetching');
const { check, validationResult }
    = require('express-validator');
    require('dotenv').config();
const JWT_SECRET ='cnkdnvkrmnkvr' ;
// creating a new user 


    router.post('/saveData', [
      check('name', 'Enter a valid name')
                      .isLength({ min: 3, max: 30 }),
      check('email', 'Enter a valid email')
                      .isLength({ min: 7, max: 40 }),
      
      check('password', 'Password length should be 6 to 10 characters')
                      .isLength({ min: 6, max: 12 })
  ], async (req, res) => {
   let success=false;
      // validationResult function checks whether
      // any occurs or not and return an object
      const errors = validationResult(req);
   
      // If some error occurs, then this
      // block of code will run
      if (!errors.isEmpty()) {
          res.status(400).json({ success,errors: errors.array() })
      }
   
      // If no error occurs, then this
      // block of code will run
      try {
        const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
          //res.send("Successfully validated")
          const user = new User({
            name: req.body.name,
            
            email: req.body.email,
            password: secPass,
    
    
          });
         await user.save()
          //console.log(user.name)
         // res.send(req.check);
         const data = {
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
    
    
        // res.json(user)
        success=true;
        //res.json({authtoken,success})
          // authtoken.save()


         res.status(201).json({ authtoken, success });
      }
      catch (error){
        console.error(error.message);
    res.status(500).send('Server Error');

      }

    })
// 
router.post('/login', [
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  //console.log("fcjnrun")

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', userfetching,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

}

);


      

 
















router.post('/getuser', userfetching,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router;
