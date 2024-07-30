export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: string[];
  dislikes: string[];
  likesCount: number;
  dislikesCount: number;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  postId: string;
  content: string;
  author: string;
  username: string;
  createdAt: string;
}

export interface Suggestion {
  topic: string;
}
