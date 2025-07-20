import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  imports: [
    
    CommonModule,
    PostsRoutingModule,
    PostListComponent,
    PostCreateComponent,
    PostDetailComponent
  ],
})
export class PostsModule {}
