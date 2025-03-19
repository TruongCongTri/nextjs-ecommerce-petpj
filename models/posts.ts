import { IData } from "./general";

export interface IPostType {
  id: number;
  title: string;
  body: string;
  reactions: IReactionType;
  tags: string[];
  views: number;
  userId: number;
}

export interface IPostFetch extends IData {
  posts: IPostType[];
}

export interface IReactionType {
  likes: number;
  dislikes: number;
}



// get post list 
// get user by userid from each post
// get tag[0]
// get total from comment data by postid 