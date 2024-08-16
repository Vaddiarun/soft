import admin from "../models/admin.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

export const signIn = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body.formdata;
    try {
        const validUser = await admin.findOne({ email });
        if (!validUser) {
            return res.status(400).json("Invalid Credentials");
        }
        const isMatch = await bcryptjs.compare(password, validUser.password);
        if (!isMatch) {
            return res.status(400).json("Invalid Credentials");
        }
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT)
        const { password: pass, ...rest } = validUser._doc;
        res
            .status(200)
            .json({ rest, token,success:true });
    } catch (err) {
        res.status(500).json({ message: err.message,success:false })
    }
}    

export const signUp = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password || email==="" || password==="") {
        return res.status(500).json("All Fields Are Required");
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new admin({
        email,
        password: hashedPassword,
        isAdmin:true
    })

    try {
        const res = await newUser.save();
        console.log(res)
        const data = await admin.find()
        console.log(data)
        res.status(200).json("Signed Up Successfully")
    } catch (err) {
        return res.status(500).json(`error: ${err.message}`)
    }
}