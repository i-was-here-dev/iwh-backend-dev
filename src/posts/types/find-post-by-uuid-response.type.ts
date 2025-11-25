import { Post } from '../entities/post.entity';

export type FindPostByUuidServiceResponse = {
  post: Post;
  approvalCount: number;
};
