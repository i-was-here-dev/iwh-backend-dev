import { Post } from 'src/posts/entities/post.entity';
import { Between, Repository, UpdateResult } from 'typeorm';
import { PostRepositoryInterface } from '../post-repository.interface';
import { BoundingBoxQuery } from 'src/posts/interfaces/bounding-box-query.interface';
import { PointLocation } from 'src/posts/types/location.type';

export class PostRepository implements PostRepositoryInterface {
  constructor(private readonly repository: Repository<Post>) {}

  async findByUserId(userId: number): Promise<Post[] | null> {
    return await this.repository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
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

  async findInBoundingBox(query: BoundingBoxQuery): Promise<Post[] | null> {
    const minLatitude = query.centerLatitude - query.boxWidth / 2;
    const maxLatitude = query.centerLatitude + query.boxWidth / 2;
    const minLongitude = query.centerLongitude - query.boxLength / 2;
    const maxLongitude = query.centerLongitude + query.boxLength / 2;

    return await this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('post.latitude BETWEEN :minLatitude AND :maxLatitude', {
        minLatitude: minLatitude,
        maxLatitude: maxLatitude,
      })
      .andWhere('post.longitude BETWEEN :minLongitude AND :maxLongitude', {
        minLongitude: minLongitude,
        maxLongitude: maxLongitude,
      })
      .orderBy('RANDOM()')
      .take(query.limit)
      .getMany();
  }

  async findInVicinity(pointLocation: PointLocation, vicinityDistance: number, page: number = 1, limit: number = 5): Promise<Post[] | null> {
    const offset = (page - 1) * limit;

    return await this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoin('post.approvals', 'approval')
      .addSelect('COUNT(approval.id)', 'approvalCount')
      .where(
        `
        6371000 * acos(
          cos(radians(:latitude)) * 
          cos(radians(post.latitude)) * 
          cos(radians(post.longitude) - radians(:longitude)) + 
          sin(radians(:latitude)) * 
          sin(radians(post.latitude))
        ) <= :distance
      `,
        {
          latitude: pointLocation.latitude,
          longitude: pointLocation.longitude,
          distance: vicinityDistance, // distance in meters
        },
      )
      .groupBy('post.id, user.id, profile.id')
      .orderBy('approvalCount', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }
}
