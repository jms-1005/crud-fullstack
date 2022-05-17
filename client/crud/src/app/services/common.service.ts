import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post{
  ID: number;
  post:string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private url = 'http://localhost:4400/posts';

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<{ data:Post[], message:any }>(this.url);
  }


}
