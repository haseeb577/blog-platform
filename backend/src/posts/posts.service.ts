import { Injectable } from '@nestjs/common';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  createPost(post: { title: string; content: string, }, authorName: string): Post {
    const timestamp = new Date().toISOString();
    const newPost: Post = {
      id: Date.now(),
      title: post.title,
      content: post.content,
      author: authorName,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.posts.push(newPost);
    return newPost;
  }

  getAllPostsByUser(email: string): Post[] {
    return this.posts.filter(post => post.author === email);
  }

  getAllPosts(): Post[] {
    return this.posts;
  }

  deletePost(id: number): { message: string } {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      throw new Error(`Post with id ${id} not found`);
    }
    this.posts.splice(index, 1);
    return { message: `Post with id ${id} deleted successfully` };
  }

  updatePost(
    id: number,
    data: { title?: string; content?: string },
    email: string
  ): Post | null {
    const postIndex = this.posts.findIndex(
      post => post.id === id && post.author === email
    );
    if (postIndex === -1) return null;

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.posts[postIndex];
  }

  getPostById(id: number): Post | null {
    return this.posts.find(post => post.id === id) || null;
  }

  findOne(id: string): Post | null {
    return this.posts.find(post => post.id === Number(id)) || null;
  }
}
