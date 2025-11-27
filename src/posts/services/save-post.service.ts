import { Post } from '../entities/post.entity';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { SavePostPort, SavePostUseCase } from './usecases/save-post.usecase';

export class SavePostService implements SavePostUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(payload: SavePostPort): Promise<Post> {
    const { userId, body, title, longitude, latitude, location, imageName, videoName } = payload;

    const post = new Post();
    post.title = title;
    post.body = body;
    post.location = location;
    post.latitude = latitude;
    post.longitude = longitude;
    post.imageName = imageName || null;
    post.videoName = videoName || null;
    post.userId = userId;

    return await this.postRepository.save(post);
  }
}
