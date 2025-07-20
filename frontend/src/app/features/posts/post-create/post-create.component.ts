import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-post-create',
  standalone: true,
 imports: [CommonModule, FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {

  title = '';
content = '';

constructor(private postService: PostService, private router: Router) {}

createPost() {
  const author = localStorage.getItem('name') || 'Unknown Author';
  this.postService.createPost({ title: this.title, content: this.content,author: author }).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Post Created!',
        text: 'Your post was successfully created.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        this.router.navigate(['/posts']);
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong while creating the post.',
        confirmButtonColor: '#d33'
      });
      console.error(err);
    }
  });
}



}
