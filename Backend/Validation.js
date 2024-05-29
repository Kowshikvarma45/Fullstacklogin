const zod = require("zod")

const SignupValidation = zod.object({
    username: zod.string(),
    password: zod.string(),
    email:zod.string().email(),
    phone:zod.string().max(10).min(10)
})

const LoginValidation = zod.object({
    username: zod.string(),
    password: zod.string(),
    email: zod.string().email()
})

module.exports = {
    SignupValidation:SignupValidation,
    LoginValidation:LoginValidation

}