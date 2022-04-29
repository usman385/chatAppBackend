const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "http://www.dumpaday.com/wp-content/uploads/2019/12/pictures-10-2.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// userschema.pre('save',async function(next) {
//   if(!this.modified){
//     next();

//   }else{
//     const salt = await bcrypt.gensalt(10);
//     this.password = await bcrypt.hash(this.password, salt)
//   }
// })

const Users = mongoose.model("User", UserModel);
module.exports = Users;
