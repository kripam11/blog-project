import express from "express";
import { users, posts, comments } from "../data.js";



const router = express.Router();

router.get("/users",(req,res)=>{
    res.send(JSON.stringify(users));
    console.log("User route hits");
})

router.get("/users/email/:email",(req,res)=>{
    const email = req.params.email;

    const reqUser = users.find((user)=> user.emailid===email);
    if (!reqUser) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    res.send(JSON.stringify(reqUser));
});

router.get("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const reqUser = users.find((user)=>user.id===id);
    if(!reqUser){
        return res.status(404).json({
            message:"User not found",
        });
    }
    res.send(JSON.stringify(reqUser));
});

router.post("/users",(req,res)=>{
    const newUser = {
        id : users.length + 1,
        emailid : req.body.email,
        username : req.body.name,
    }
    users.push(newUser);
    res.send(JSON.stringify(newUser));
})
router.patch("/users/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const ind = users.findIndex((user)=> user.id===id);
  const old = users.find((user)=> user.id===id);
  if(ind === -1){
   return res.status(404).json({
      message: "User not found"
   });
}
  else{
    const updateUser = {
    id : id,
    username : req.body.name || old.username,
    emailid : req.body.email || old.emailid,
  }
  users[ind] = updateUser;
  res.json(updateUser);
  console.log(updateUser);
  }
});

router.delete("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const idx = users.findIndex((user)=>user.id===id);
    if(idx>-1){
        users.splice(idx,1);
        res.send(JSON.stringify(users));
    }
    else{
        res.status(404).json({
  message: "Uesr not found"
});
    }
})

router.delete("/all",(req,res)=>{
    const userKey = req.query.key;
    if(userKey==="manchester"){
        users.length = 0;
        posts.length = 0;
        comments.length = 0;
        res.send(JSON.stringify(users));
    }
    else{
       res.status(404).json({
  message: "User not found"
});
    }
})

router.get("/users/:userId/posts", (req, res) => {
    const userId = parseInt(req.params.userId);

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const userPosts = posts.filter(post => post.authorId === userId);

    res.json(userPosts);
});

export default router;