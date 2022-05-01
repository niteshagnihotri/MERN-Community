const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true,
    },
    name: {
        type:String,
        required:true
    }
    ,email: {
        type:String,
        required:true
    }
    ,profession: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    }
    ,tokens: [{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    let token;
    try{
        token = jwt.sign({_id:this.id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;