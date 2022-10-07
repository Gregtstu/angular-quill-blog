import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getById(id:any):Observable<any> {
    return this.http.get<any>(`${environment.fbBDUrl}/posts/${id}.json`)
      .pipe( map ( res => {
        return {
          ...res,
          id,
          data: new Date(res.data)
        }
      }));
  }

  editPost(post: any):Observable<any>{
    return this.http.put<any>(`${environment.fbBDUrl}/posts/${post.id}.json`, post);
  }

  deletePost(id: string){
    return this.http.delete<any>(`${environment.fbBDUrl}/posts/${id}.json`);
  }
}
