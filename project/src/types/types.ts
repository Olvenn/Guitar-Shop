export type Review = {
  id: number;
  createAt: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  guitarId: number;
}

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  comments?: Review[];
}

export type Comment = {
  guitarId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
}

