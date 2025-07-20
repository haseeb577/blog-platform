import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import Swal from 'sweetalert2';


// ✅ Register required AG Grid module
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AgGridModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  rowData: Post[] = [];

  actionRenderer = (params: any): HTMLElement => {
    const link = document.createElement('a');
    link.href = `/posts/${params.value}`;
    link.className = 'btn btn-sm btn-outline-primary';
    link.innerText = 'Read More';
    return link;
  };

  columnDefs: ColDef<Post>[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width:80 },
  { field: 'content', headerName: 'Content', flex: 1 },
  { field: 'author', headerName: 'Author', width: 200 },
  {
    field: 'createdAt',
    headerName: 'Published',
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    width: 150,
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    width: 150,
  },
  {
    headerName: 'Actions',
    field: 'id',
    cellRenderer: (params: { value: number }) => {
      const container = document.createElement('div');

      const viewBtn = document.createElement('button');
      viewBtn.innerText = 'View';
      viewBtn.className = 'btn btn-sm btn-outline-primary me-1';
      viewBtn.onclick = () => {
        window.location.href = `/posts/${params.value}`;
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.className = 'btn btn-sm btn-outline-danger';
      deleteBtn.onclick = () => {
        this.deletePost(params.value); // uses sweetalert
      };

      container.appendChild(viewBtn);
      container.appendChild(deleteBtn);
      return container;
    },
  },
];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.rowData = data;
        console.log('Loaded posts:', this.rowData);
      },
      error: (err) => {
        console.error('Failed to load posts', err);
      },
    });
  }
  deletePost(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this post?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          window.location.href='/posts';
          Swal.fire('Deleted!', 'The post has been deleted.', 'success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to delete the post.', 'error');
        },
      });
    }
  });
}
}
