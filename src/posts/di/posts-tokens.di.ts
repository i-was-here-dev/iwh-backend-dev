export class PostsDiTokens {
  public static readonly PostRepositoryInterface: string = 'PostRepositoryInterface';
  public static readonly PostgresPostRepositoryInterface: string = 'PostgresUserRepositoryInterface';
  public static readonly ApprovalRepositoryInterface: string = 'ApprovalRepositoryInterface';
  public static readonly PostgresApprovalRepositoryInterface: string = 'PostgresApprovalRepositoryInterface';
  public static readonly CommentRepositoryInterface: string = 'CommentRepositoryInterface';
  public static readonly PostgresCommentRepositoryInterface: string = 'PostgresCommentRepositoryInterface';

  public static readonly SavePostService: string = 'SavePostService';
  public static readonly SaveApprovalService: string = 'SaveApprovalService';
  public static readonly SaveCommentService: string = 'SaveCommentService';
  public static readonly FindPostsByUserIdService: string = 'FindPostsByUserIdService';
  public static readonly FindPostByUuidService: string = 'FindPostByUuidService';
  public static readonly FindPostsInUserVicinityService: string = 'FindPostsInUserVicinityService';
  public static readonly FindPostsInBoundingBoxService: string = 'FindPostsInBoundingBoxService';
  public static readonly UpdateCommentService: string = 'UpdateCommentService';
  public static readonly DeleteApprovalService: string = 'DeletApprovalService';
  public static readonly SoftDeleteCommentService: string = 'SoftDeleteCommentService';
}
