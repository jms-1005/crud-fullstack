import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/interfaces';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newpost:string = '';
  posts:Post[] = [];

  imageFormData:any;
  imgname:string = '';

  constructor(private cs:CommonService) { }

  onChange(event:any){
    let file:File = event.target.files[0];
    this.imgname = file.name;
    console.log(file.name);
    const formData = new FormData();

    formData.append('image', file);
    console.log(formData);
    this.imageFormData = formData;
  }

  uploadImage(){
    this.cs.uploadFile(this.imageFormData).subscribe( response => {
      console.log(response);
    })
  }

  getPosts(){
    this.cs.getPosts().subscribe( posts => {
      this.posts = posts.data;
      console.log(posts.data, this.posts);
    })
  }

  addNewPost(){
    this.cs.newPost(this.newpost, this.imgname).subscribe( insertedPost => {
      console.log(insertedPost.newpost[0]);
      let newPost =  insertedPost.newpost[0];
      this.cs.uploadFile(this.imageFormData).subscribe(response => {
        console.log('image upload done');
        this.posts.push(newPost);
        console.log('content pushed');
      })
      // this.posts.push(insertedPost.newpost[0]);

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
