export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type RootStackParamList = {
  Posts: undefined;
  Comments: { post: Post };
  EditComment: { comment: Comment };
};
