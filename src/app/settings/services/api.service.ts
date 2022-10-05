import { Injectable } from '@angular/core';
import {IPosts} from "../interfaces/iposts";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addPost(post:any):Observable<any>{
    return this.http.post<any>(`${environment.fbBDUrl}/posts.json`, post)
      .pipe(map(res => {
          return {
            ...post,
            id: res.name,
            data: new Date(post.data),
          }
        })
      );
  }

  getAll():Observable<any> {
    return this.http.get<any>(`${environment.fbBDUrl}/posts.json`)
      .pipe( map ( res => {
        return Object.keys(res)
          .map( key => ({
            ...res[key],
            id: key,
            data: new Date(res[key].data)
          }));
      }));
  }
}
