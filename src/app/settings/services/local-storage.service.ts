import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  addLs(post: Object, postId: string) {
    if (localStorage.getItem('posts') === null) {
      let posts: any[] = [];
      posts.push(post);
      posts.map(item => {
        if (item.favorite === false && item.id === postId) {
          item.favorite = true;
        }
        localStorage.setItem('posts', JSON.stringify(posts));
      });
    } else {
      let posts: any[] = JSON.parse(localStorage.getItem('posts') || '[]');
      posts = posts.filter(item => item.id != postId);
      posts.push(post);
      posts.map(item => {
        if (item.favorite === false && item.id === postId) {
          item.favorite = true;
        }
        localStorage.setItem('posts', JSON.stringify(posts));
      });
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }

  favorite(postID:string, disable:boolean):void{
    JSON.parse(localStorage.getItem('posts') || '{}').forEach((item:any) => {
      if (postID === item.id && item.favorite === true){
        disable = item.favorite;
      }else {
        disable = false;
      }
    });
  }


  saveLs(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLs(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}')
  }

  removeLs(key: string): void {
    localStorage.removeItem(key);
  }

  clearLs(): void {
    localStorage.clear();
  }
}
