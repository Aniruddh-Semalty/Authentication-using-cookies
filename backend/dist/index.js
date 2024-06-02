"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "test@123";
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
//A dummy signin endpoint
app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //Do database steps here
    const token = jsonwebtoken_1.default.sign({
        id: "Aniruddh",
    }, JWT_SECRET);
    res.cookie("token", token);
    res.send("You are logged in");
});
//Protected backend route
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decoded_token = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    //if token is valid
    res.send({
        userId: decoded_token.id
    });
});
//for logout or clearing the cookie
app.post("/logout", (req, res) => {
    res.clearCookie("token"); //or res.cookie("token",""); make it empty
    res.json({
        message: "You are logged out",
    });
});
app.listen(3000);
