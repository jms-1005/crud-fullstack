export interface Post{
  ID: number;
  post:string;
}

export interface GetPosts{
  data: Post[];
  message:any;
}

export interface NewPost{
  newpost: [ { ID:number, post: string}];
  message:any;
}

export interface DeletePost{
  deleteSuccess:any;
  message:any;
}
