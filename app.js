import express from "express"
import ejs from  "ejs";
import dotenv  from 'dotenv'
import cors from 'cors'
import router from "./router/tourist.router.js";
import morgan from "morgan";
import { Strategy as LocalStrategy } from 'passport-local';
import session from "express-session";
import {passport, Tourist} from "./models/tourist.model.js";
import Guiderouter from "./router/guide.router.js";
const app = express()
dotenv.config()
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
const logFormat = '[:date[iso]] :method :url :status :response-time ms - :res[content-length]';
// Use morgan middleware with custom log format
app.use(morgan(logFormat));
app.use(cors({
    origin: true,
    credentials: true
  }));
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false } // Set to false for development with HTTP
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },Tourist.authenticate()
    ))

app.get("/",(req,res)=>{
    res.render("test")
})

app.use("/tourist",router)
app.use("/guide",Guiderouter)

app.get("*",(req,res)=>{
    res.render("err",{msg:"404 Not Found!"});
})
export default app