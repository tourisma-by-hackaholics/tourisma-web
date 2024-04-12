import { Router } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { Tourist,passport } from "../models/tourist.model.js";
const router =Router();
// POST route for tourist registration
router.post('/register', (req, res, next) => {
  const {
    email,
    password,
    tourist_id,
    first_name,
    last_name,
    age,
    nationality,
    gender
  } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !first_name || !last_name || !age || !nationality || !gender) {
    return res.status(400).send("Please fill out all fields");
  }

  // Use passport-local-mongoose's register method to create a new tourist with a hashed password
  Tourist.register(new Tourist({
    email,
    tourist_id,
    first_name,
    last_name,
    age,
    nationality,
    gender,
    password
  }), password, (err, tourist) => {
    if (err) {
      console.error('Error registering tourist:', err);
      return res.status(500).send('Error registering tourist');
    }

    // Tourist registered successfully
    res.send('Tourist registered successfully');
  });
});


router.post('/login', passport.authenticate('tourist', {
  successRedirect: '/tourist-dashboard',
  failureRedirect: '/tourist-login',
  failureFlash: true
}));

export default router;