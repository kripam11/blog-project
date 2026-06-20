import express from "express";
import { users,posts,comments } from "../data.js";


const router = express.Router();

router.get("/comments",(req,res)=>{
    res.send(JSON.stringify(comments));
});

router.get("/comments/:commentId",(req,res)=>{
     const id = parseInt(req.params.commentId);

    const reqComment = comments.find((comment)=>comment.id===id);
    if (!reqComment) {
        return res.status(404).json({
            message: "Comment not found",
        });
    }
    res.send(JSON.stringify(reqComment));
});

router.post("/comments/:postId/:userId",(req,res)=>{
    const idx1 = parseInt(req.params.postId);
    const idx2 = parseInt(req.params.userId);
    const userIdx = users.findIndex((user)=> user.id===idx2);
    const postIdx = posts.findIndex((post)=> post.id===idx1);
    if(userIdx > -1 && postIdx>-1){
        const newComment = {
            id : comments.length + 1,
            userId : idx2,
            text : req.body.text,
            postId : idx1,
            date : new Date()
        }
        comments.push(newComment);
        res.send(JSON.stringify(newComment));
    }
    else{
    res.status(404).json({
  message: "Comment not found"
});
    }
})

router.patch("/comments/:commentId",(req,res)=>{
  const id = parseInt(req.params.commentId);
  const ind = comments.findIndex((comment)=> comment.id===id);
  const old = comments.find((comment)=> comment.id===id);
  if(ind!=-1){
    const updateComment = {
    id : old.id,
    postId : old.postId,
    userId : old.userId,
    text : req.body.text || old.text,
    date : new Date(),
  }
  comments[ind] = updateComment;
  res.json(updateComment);
  }
  else{
    res.status(404).json({
  message: "Comment not found"
});
  }
});

router.delete("/comments/:commentId",(req,res)=>{
    const id = parseInt(req.params.commentId);
    const idx = comments.findIndex((comment)=>comment.id===id);
    if(idx>-1){
        comments.splice(idx,1);
        res.send(JSON.stringify(comments));
    }
    else{
        res.status(404).json({
  message: "Comment not found"
});
    }
})

export default router;


