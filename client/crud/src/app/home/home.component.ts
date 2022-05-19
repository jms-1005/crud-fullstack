import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

interface Post{
  ID: number;
  post:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newpost:string = '';
  posts:Post[] = [];

  imageFormData:any;

  constructor(private cs:CommonService) { }

  onChange(event:any){
    let file:File = event.target.files[0];
    console.log(file);
    const formData = new FormData();

    formData.append('image', file);
    console.log(formData);
    this.imageFormData = formData;
  }

  uploadImage(){

  }

  getPosts(){
    this.cs.getPosts().subscribe( posts => {
      this.posts = posts.data;
      console.log(posts.data, this.posts);
    })
  }

  addNewPost(){
    this.cs.newPost(this.newpost).subscribe( insertedPost => {
      console.log(insertedPost.newpost[0]);
      this.posts.push(insertedPost.newpost[0]);

    })
  }

  editPost(id:number){
    console.log(id);
  }

  deletePost(id:number){
    this.cs.deletePost(id).subscribe( deleteSuccess => {
        console.log(deleteSuccess);
        if(deleteSuccess.deleteSuccess === 1){
          let index = this.posts.findIndex(postid => postid.ID === id);
          this.posts.splice(index, 1);
        }
    } )
  }

  ngOnInit(): void {
    this.getPosts();
  }

}
