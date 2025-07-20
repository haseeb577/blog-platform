import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { switchMap, filter } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-post-detail',
  standalone: true,
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postService = inject(PostService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  postForm!: FormGroup;
  postId!: number;

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
    });

    this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          this.postId = +params.get('id')!;
          return this.postService.getPostById(this.postId.toString());
        })
      )
      .subscribe((post) => {
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
        });
        this.cdr.detectChanges();
      });
  }

 updatePost() {
  if (this.postForm.valid) {
    this.postService.updatePost(this.postId, this.postForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Post Updated!',
          text: 'Your post was successfully updated.',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/posts']);
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating the post. Please try again.',
          confirmButtonColor: '#d33'
        });
        console.error(err);
      }
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Form Incomplete',
      text: 'Please fill in all required fields before submitting.',
      confirmButtonColor: '#f6c23e'
    });
  }
}

}
