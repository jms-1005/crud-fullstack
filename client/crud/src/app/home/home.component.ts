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

  posts:Post[] = [];
  constructor(private cs:CommonService) { }

  getPosts(){
    this.cs.getPosts().subscribe( posts => {
      this.posts = posts.data;
      console.log(posts.data, this.posts);
    })
  }

  editPost(id:number){
    console.log(id);
  }

  deletePost(id:number){
    console.log(id);
  }

  ngOnInit(): void {
  }

}
