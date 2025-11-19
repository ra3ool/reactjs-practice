export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentsPage {
  data: Comment[];
  nextCursor?: number;
}
