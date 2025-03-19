export interface IReviewType {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IReviewFetch {
  reviews: IReviewType[];
}
