import { hash } from "bcrypt";
import mongoose, { Schema,model,Types} from "mongoose"; 

const schema = new Schema({

    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password :{
       type:String,
       required:true,
       select:false,
    },
    // her we store all the friendId ,
    friends: [
        { type: Types.ObjectId,
         ref: 'User'
     }
    ],
    intrests:{
        type:[String],
         default:[]
    }


},{
    timestamps:true,
});

// before saving this password , i going to hash first 
// then save into the database
schema.pre("save",async function (next) {
    // when password is hashed previously then we call the next middleware 
    if(!this.isModified("password")) next();
    this.password=await hash(this.password,10);
    // next()
})


export const User3 =mongoose.models.User3 || model("User3",schema);