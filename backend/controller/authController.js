import bcrypt from "bcryptjs";
import User from "../models/User.js";
import gentoken from "../config/token.js";
export const register = async (req, res) => {
  const { name, email, password,role } = req.body;
  console.log("the data of backend",req.body)
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role
  });

 
  return res.status(201).json({ message: "Registered successfully",user});
};


export const login = async (req, res) => {

  try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });
  const token=await gentoken(user._id,user.role);
  res.cookie("token",token,{
    httpOnly:true,
    secure:false,
    sameSite:true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  res.json({ message:"login data successfully",user });
  } catch (error) {
    console.log(`error is:${error}`)
  }
  
};