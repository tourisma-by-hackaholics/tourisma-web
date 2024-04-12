import mongoose from 'mongoose';
import connectDB from '../config/database.config.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from 'mongoose-findorcreate'
connectDB();

const touristSchema = new mongoose.Schema({
    tourist_id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, 
      required: true,
       unique: true ,
       match: [
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Please use a valid email'
      ]
      },
    password: { type: String, 
      required: true 
  },
    age: { type: Number, 
      required: true 
  },
    nationality: { type: String,
       required: true 
      },
    gender: { type: String,
       enum: ['Male', 'Female', 'Other'],
        required: true
       }
  });
  

touristSchema.plugin(passportLocalMongoose,{usernameField:'email'});
touristSchema.plugin(findOrCreate);

// Create the User model
const Tourist = mongoose.model('Tourist', touristSchema);
passport.use(new LocalStrategy(Tourist.authenticate()));
passport.serializeUser(function(Tourist, done) {
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

export {passport,Tourist}