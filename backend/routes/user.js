import  express from "express"
import { registerHandler,validateHandler,loginHandler, sendRequestValidators, acceptRequestValidators} from "../lib/validators.js";
import { newUser,login, search, logout, sendRequest, acceptFriendRequest } from "../controllers/user.js";
import {isAuthenticated} from "../middlewares/auth.js"

const app=express.Router();

app.post("/new",registerHandler(),validateHandler,newUser);
app.post("/login",loginHandler(),validateHandler,login);
app.use(isAuthenticated)
app.get("/search",search)
app.get("/logout",logout)
app.put("/sendRequest",sendRequestValidators(),validateHandler,sendRequest)
app.put("/acceptRequest",acceptRequestValidators(),validateHandler,acceptFriendRequest)


export default app