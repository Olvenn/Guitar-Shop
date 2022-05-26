export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
}

export type CommentPost = {
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,
}

export type Comment = {
  id: string,
  createAt: string,
  commentData: CommentPost,
}

export type Coupon = {
  coupon: string;
}

export type Order = {
  coupon: string | null;
  guitarsIds: number[];
}
