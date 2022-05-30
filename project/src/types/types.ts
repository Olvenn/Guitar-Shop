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

export type ReviewPost = {
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,
}

export type Review = {
  id: string,
  createAt: string,
  commentData: ReviewPost,
}

export type Coupon = {
  coupon: string;
}

export type Order = {
  coupon: string | null;
  guitarsIds: number[];
}
