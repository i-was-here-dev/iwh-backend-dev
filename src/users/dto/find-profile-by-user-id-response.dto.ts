import { Comment } from 'src/posts/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';

export class FindProfileByUserIdResponseDto {
  uuid: string;
  nickname: string;
  points: number;
  profilePictureName: string;
  posts: Post[];
  comments: Comment[];
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
