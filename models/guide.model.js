import mongoose from 'mongoose';
import connectDB from '../config/database.config.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from 'mongoose-findorcreate'
connectDB();

const guideSchema = new mongoose.Schema({
    first_name: { type: String,
       required: true 
      },
    last_name: { 
      type: String,
       required: true
       },
    company_name: { 
      type: String
   },
    street_address: {
       type: String
       },
    email: { 
      type: String, 
      required: true, 
      unique: true
   },
    city: { 
      type: String
   },
    state: { 
      type: String
   },
    country: { 
      type: String
   },
    pincode: { 
      type: Number
   },
    highest_qualification: { 
      type: String
   },
    aadhar_no: { 
      type: String,
      unique:true 
  },
    license: { 
      type: String,
      unique:true
   },
    phone_no: { 
      type: String
   },
    password: {
       type: String,
        required: true 
      }
  });
  guideSchema.plugin(passportLocalMongoose,{usernameField:'email'});
  guideSchema.plugin(findOrCreate);

// Create the User model
const Guide= mongoose.model('Guide', guideSchema);
passport.use(new LocalStrategy(Guide.authenticate()));
passport.serializeUser(function(Guide, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      done(err);
    });
});

export {passport,Guide}