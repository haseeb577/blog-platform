import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createPost(post: { title: string; content: string, author:any }): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, { headers: this.getAuthHeaders() });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updatePost(id: number, data: { title?: string; content?: string }): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }
}
