import { Post } from '../entities/post.entity';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { SavePostPort, SavePostUseCase } from './usecases/save-post.usecase';

export class SavePostService implements SavePostUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(payload: SavePostPort): Promise<Post> {
    const { userId, body, title, longitude, latitude, imageName, videoName } = payload;

    const post = Post.create({
      title: title,
      userId: userId,
      body: body,
      longitude: longitude,
      latitude: latitude,
      imageName: imageName,
      videoName: videoName,
    });

    return await this.postRepository.save(post);
  }
}
