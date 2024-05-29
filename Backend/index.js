const express = require("express");
const app = express();
const cors = require("cors");
const { SignupValidation, LoginValidation } = require("./Validation");
const { UserModel } = require("./db");

app.use(cors());
app.use(express.json());

app.post('/Signup', async (req, res) => {
    const object = req.body;

    const parsedobject = SignupValidation.safeParse(object);

    if (parsedobject.success) {
        try {
            const existingUser = await UserModel.findOne({ email: parsedobject.data.email });
            if (existingUser) {
                return res.status(400).json({
                    msg: "Email already exists"
                });
            }

            const newUser = new UserModel(parsedobject.data);
            await newUser.save();
            console.log("User successfully saved to db");
            res.status(201).json({
                msg: "User successfully registered"
            });
        } catch (error) {
            console.error("Error saving user to db:", error);
            res.status(500).json({
                msg: "Internal server error"
            });
        }
    } else {
        res.status(400).json({
            msg: "Validation is unsuccessful due to bad inputs",
            errors: parsedobject.error.errors 
        });
    }
});

app.get('/Login',async(req, res) => {
    const object = {
        username:req.query.username,
        password:req.query.password,
        email:req.query.email
    }
    console.log(object)
    const parsedobject = LoginValidation.safeParse(object)
    if(parsedobject.success) {
        const existingUser = await UserModel.findOne({ email: parsedobject.data.email, password: parsedobject.data.password });
        if(existingUser) {
            res.json({
                msg:"Welcome back " + parsedobject.data.username +"!"
            })
        }
        else {
            res.json({
                msg:"User not found"
            })
        }
    }
    else {
        res.json({
            msg:"sorry something up with the inputs"
        })
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
