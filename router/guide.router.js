import { Router } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { Guide,passport } from "../models/guide.model.js";
const Guiderouter =Router();

Guiderouter.post('/register', (req, res, next) => {
    const {
        first_name,
        last_name,
        company_name,
        street_address,
        email,
        city,
        state,
        country,
        pincode,
        highest_qualification,
        aadhar_no,
        license,
        phone_no,
        password
    } = req.body;
    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ err: "Missing fields for guide" });
    }

    Guide.register(new Guide({
        first_name,
        last_name,
        company_name,
        street_address,
        email,
        city,
        state,
        country,
        pincode,
        highest_qualification,
        aadhar_no,
        license,
        phone_no,
        password
      }), password, (err, Guide) => {
        if (err) {
          console.error('Error registering Guide:', err);
          return res.status(500).send('Error registering Guide');
        }
    
        // Tourist registered successfully
        res.send('Guide registered successfully');
      });
}); 
export default Guiderouter