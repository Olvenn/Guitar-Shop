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

export type PersonData = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type AuthData = PersonData & {
  email: string;
  token: string;
}


export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}


