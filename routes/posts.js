import express from "express";
import { users, posts, comments } from "../data.js";

const router = express.Router();

router.get("/posts",(req,res)=>{
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filteredPosts = posts.filter((post)=>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase()) );

     const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json({
        totalPosts: filteredPosts.length,
        currentPage: page,
        totalPages: Math.ceil(filteredPosts.length / limit),
        posts: paginatedPosts
    });
})

router.get("/posts/:id",(req,res)=>{
     const id = parseInt(req.params.id);

    const reqPost = posts.find((post)=>post.id===id);
    if(!reqPost){
   return res.status(404).json({
      message:"Post not found"
   });
}
    else{
        res.send(JSON.stringify(reqPost));
    }
});

router.post("/posts/:authId",(req,res)=>{
    const idx = parseInt(req.params.authId);
    const userIdx = users.findIndex((user)=> user.id===idx);
    if(userIdx!=-1){
        const newPost = {
            id : posts.length + 1,
            title : req.body.title,
            content : req.body.content,
            authorId : idx,
            date : new Date()
        }
        posts.push(newPost);
        res.send(JSON.stringify(newPost));
    }
    else{
   res.status(404).json({
  message: "User not found"
});
    }
})

router.patch("/posts/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const ind = posts.findIndex((post)=> post.id===id);
  const old = posts.find((post)=> post.id===id);

  if(ind === -1){
   return res.status(404).json({
      message:"Post not found"
   });
}
  else{
    const updatePost = {
    id : id,
    title : req.body.title || old.title,
    content : req.body.content || old.content,
    authorId: old.authorId,
    date : new Date(),
  }
  posts[ind] = updatePost;
  res.json(updatePost);
  console.log(updatePost);
  }
});

router.delete("/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const idx = posts.findIndex((post)=>post.id===id);
    if(idx>-1){
        posts.splice(idx,1);
        res.json(posts);
    }
    else{
       res.status(404).json({
  message: "Comment not found"
});
    }
})

router.get("/posts/:postId/comments", (req, res) => {
    const postId = parseInt(req.params.postId);

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const postComments = comments.filter(
        comment => comment.postId === postId
    );

    res.json(postComments);
});

export default router;