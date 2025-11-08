import { Post } from 'src/posts/entities/post.entity';
import { Between, Repository, UpdateResult } from 'typeorm';
import { PostRepositoryInterface } from '../post-repository.interface';

export class PostRepository implements PostRepositoryInterface {
  constructor(private readonly repository: Repository<Post>) {}

  async findByProfileId(profileId: number): Promise<Post[] | null> {
    return await this.repository.find({
      where: {
        profile: { id: profileId },
      },
      relations: ['profile'],
    });
  }

  async save(post: Post): Promise<Post> {
    return await this.repository.save(post);
  }

  async findByUuid(uuid: string): Promise<Post | null> {
    return await this.repository.findOne({
      where: {
        uuid: uuid,
      },
    });
  }

  async softDelete(post: Post): Promise<boolean> {
    const result: UpdateResult = await this.repository.softDelete(post.id);

    if (result.affected > 0) return true;
    return false;
  }

  async findByBoundingBox(centerLatitude: number, centerLongitude: number, boxLength: number, boxWidth: number): Promise<Post[] | null> {
    const minLatitude = centerLatitude - boxWidth / 2;
    const maxLatitude = centerLatitude + boxWidth / 2;
    const minLongitude = centerLongitude - boxLength / 2;
    const maxLongitude = centerLongitude + boxLength / 2;

    return await this.repository.find({
      where: {
        latitude: Between(minLatitude, maxLatitude),
        longitude: Between(minLongitude, maxLongitude),
      },
      relations: ['profile'],
    });
  }
}
