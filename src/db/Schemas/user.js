const jsonwebtoken = require('jsonwebtoken');
const {Schema, model} = require('mongoose');
const paginate = require('mongoose-paginate')

const userSchema = new Schema({
    walletAddress:{
        type: String,
        unique: true,
        trim: true, 
        required: true
    },
    role:{
        type:String,
        required:true,
        enum:['admin','superAdmin', 'user'],
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
},{
    timestamps: true
})

userSchema.plugin(paginate);

userSchema.methods.generateToken= async function () {
    const token = jsonwebtoken.sign({_id: this._id.toString()}, process.env.SECRET);
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
}
userSchema.methods.toJSON = function (){
    const user = this;
    const objectForm = user.toObject();
    delete objectForm.tokens;
    delete objectForm.role;
    return objectForm;
}
const User = model('User',userSchema);

module.exports= User;