export interface Post{
  ID: number;
  post:string;
  thumbnail:string;
}

export interface GetPosts{
  data: Post[];
  message:any;
  thumbnail:string;
}

export interface NewPost{
  newpost: [ { ID:number, post: string, thumbnail:string}];
  message:any;

}

export interface DeletePost{
  deleteSuccess:any;
  message:any;
}
