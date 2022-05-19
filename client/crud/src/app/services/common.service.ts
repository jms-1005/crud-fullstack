import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeletePost, GetPosts, NewPost } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = 'http://localhost:4400/posts';

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<GetPosts>(this.url);
  }

  newPost(newpost:string){
    let newPostObj = {
      newpost: newpost
    }
    return this.http.post<NewPost>(this.url, newPostObj);
  }

  deletePost(id:number){
    return this.http.delete<DeletePost>(this.url + "/" + id);
  }


}
