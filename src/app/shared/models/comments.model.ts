export interface Comment {
  id?: string;
  commentText: string;
  commentMadeBy: string;
  commentDate: Date;
  isDeleted: boolean;
}
