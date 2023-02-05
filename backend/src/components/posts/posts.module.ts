import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsResolver } from './post.resolvers';

@Module({
  imports: [ConfigModule],
  providers: [PostsResolver],
})
export class PostsModule {}
