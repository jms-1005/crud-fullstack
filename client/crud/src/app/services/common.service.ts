import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeletePost, GetPosts, NewPost } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  host = environment.host;
  private url = this.host + '/posts';

  constructor(private http:HttpClient) { }

  uploadFile(filedata:any){
    return this.http.post(this.host + '/upload', filedata);
  }

  getPosts(){
    return this.http.get<GetPosts>(this.url);
  }

  newPost(newpost:string, imgname:string){
    let newPostObj = {
      newpost: newpost,
      thumbnail: imgname
    }
    return this.http.post<NewPost>(this.url, newPostObj);
  }

  deletePost(id:number){
    return this.http.delete<DeletePost>(this.url + "/" + id);
  }


}
