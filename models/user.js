const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    full_name:{
        type : String,
        required: true,
        validate(value){
            const regEx = /^[A-Za-z. ]+$/
            if(value.length < 2)
                throw new Error("Name too short")
            else if(value.length > 20)
                throw new Error("Name too long")
            else if(!regEx.test(value))
                throw new Error("Name cannot have special characters or numbers")
        }
    },
    email:{
        type : String,
        required: true,
        unique: true,
        validate(value){
            const regEx = /[A-Za-z0-9]+@northeastern\.edu/
            if(!validator.isEmail(value))
                throw new Error("Email is invalid")
            else if(!regEx.test(value)){
                throw new Error("Email should belong to northeastern.edu")
            }
        }
    },
    password:{
        type : String,
        required: true,
        validate(value){
            const digitRegex = /(?=.*\d)/;
            const uppercaseRegex = /(?=.*[A-Z])/;
            const lowercaseRegex = /(?=.*[a-z])/;
            const lengthRegex = /[A-Za-z\d@$!%*?&]{8,20}/;
            const specialCharactersRegex = /(?=.*[@$!%*?&])/;
            if(!digitRegex.test(value))
                throw new Error("Invalid Password format: Password should have at least one digit betwen 0-9")
            else if(!uppercaseRegex.test(value))
                throw new Error("Invalid Password format: Password should have at least one uppercase letter")
            else if(!lowercaseRegex.test(value))
                throw new Error("Invalid Password format: Password should have at least one lowercase letter")
            else if(!lengthRegex.test(value))
                throw new Error("Invalid Password format: Password length should be between 8 and 20 characters")
            else if(!specialCharactersRegex.test(value))
                throw new Error("Invalid Password format: Password should have at least one special character (@a,*,#,%,!,^,&..)")
        }
    }
})

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})


module.exports = mongoose.model('User', userSchema)