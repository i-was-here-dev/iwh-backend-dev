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

  async findByUuidWithDetails(uuid: string): Promise<{ post: Post; approvalCount: number } | null> {
    const result = await this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('user.profile', 'userProfile')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .leftJoinAndSelect('commentUser.profile', 'commentUserProfile')
      .leftJoin('post.approvals', 'approvals')
      .addSelect('COUNT(approvals.id)', 'approvalCount')
      .where('post.uuid = :uuid', { uuid })
      .groupBy('post.id, user.id, userProfile.id, comments.id, commentUser.id, commentUserProfile.id')
      .orderBy('comments.createdAt', 'ASC')
      .getRawAndEntities();

    if (!result.entities.length) {
      return null;
    }

    const post = result.entities[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const approvalCount = parseInt(result.raw[0]?.approvalCount || '0', 10);

    return { post, approvalCount };
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

  async findInVicinity(
    pointLocation: PointLocation,
    vicinityDistance: number,
    page: number = 1,
    limit: number = 5,
  ): Promise<Array<{ post: Post; approvalCount: number; commentCount: number }> | null> {
    const offset = (page - 1) * limit;

    const result = await this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoin('post.approvals', 'approval')
      .leftJoin('post.comments', 'comment')
      .addSelect('COUNT(DISTINCT approval.id)', 'approvalCount')
      .addSelect('COUNT(DISTINCT comment.id)', 'commentCount')
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
      .skip(offset)
      .take(limit)
      .getRawAndEntities();

    if (!result.entities.length) {
      return null;
    }

    const mappedResults = result.entities.map((post, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const approvalCount = parseInt(result.raw[index]?.approvalCount || '0', 10);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const commentCount = parseInt(result.raw[index]?.commentCount || '0', 10);

      return {
        post,
        approvalCount,
        commentCount,
      };
    });

    return mappedResults.sort((a, b) => b.approvalCount - a.approvalCount);
  }
}
