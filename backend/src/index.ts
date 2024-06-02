import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt ,{JwtPayload} from "jsonwebtoken";

const JWT_SECRET="test@123"

const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));



//A dummy signin endpoint
app.post("/signin",(req:express.Request,res:express.Response)=>{
    const email=req.body.email;
    const password=req.body.password;

    //Do database steps here

    const token=jwt.sign({
        id:"Aniruddh",
    },JWT_SECRET);

    res.cookie("token",token);
    res.send("You are logged in");
});

//Protected backend route
app.get("/user",(req:express.Request,res:express.Response)=>{
    const token=req.cookies.token;
    const decoded_token=jwt.verify(token,JWT_SECRET) as JwtPayload;
    //if token is valid
    res.send(
        {
            userId:decoded_token.id
        }
    )
}); 


//for logout or clearing the cookie
app.post("/logout",(req:express.Request,res:express.Response)=>{
    res.clearCookie("token"); //or res.cookie("token",""); make it empty
    res.json({
        message:"You are logged out",
    })
})

app.listen(3000,()=>{
    console.log("Your app is started")
});