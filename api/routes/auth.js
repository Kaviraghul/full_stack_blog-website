const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


//REGISTER
router.post("/register", async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const paswd = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: paswd,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//LOGIN

router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({username: req.body.username});

        const validate = await bcrypt.compare(req.body.password, user.password);
        if(!user || !validate){
            res.status(400).json("Wrong credentials");
        }else{
            const{ password, ...others} = user._doc;
            res.status(200).json(others);
        }
    } catch (err) {
         res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;
