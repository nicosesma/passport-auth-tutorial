import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = mongoose.Schema({
  local : {
    email : String,
    password: String
  }
})

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

export default mongoose.model('User', userSchema)
