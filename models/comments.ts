import { IData } from "./general";

export interface ICommentType {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface ICommentFetch extends IData {
  comments: ICommentType[];
}
