export let users = [
  {
    id: 1,
    username: "Shubham",
    emailid: "test@gmail.com",
  },
];

export let posts = [
  {
    id: 1,
    title: "Welcome to the Blog",
    content: "This is the first post on our blog platform.",
    authorId: 1,
    date: new Date(),
  },
];

export let comments = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    text: "Great first post!",
    date: new Date(),
  },
];