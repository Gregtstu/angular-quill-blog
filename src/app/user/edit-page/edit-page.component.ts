import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../settings/services/api.service";
import {PostService} from "../../settings/services/post.service";
import {switchMap} from "rxjs";
import {IPosts} from "../../settings/interfaces/iposts";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from "../../settings/services/local-storage.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  public quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      // ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video']                         // link and image, video
    ]
  };

  public quillConfigImg = {
    toolbar: [
      // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],
      //
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
      //
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      //
      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      [{ 'align': [] }],

      // ['clean'],                                         // remove formatting button

      ['image']                         // link and image, video
    ]
  };
  public post!:IPosts;
  public postId!:any;
  public form!:FormGroup;
  public flag:boolean = false;
  public disable!:boolean;
  constructor(
    private routerActive:ActivatedRoute,
    private api:ApiService,
    private postService:PostService,
    private router:Router,
    private localStarage:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.routerActive.params.subscribe(res => {
      this.postId = res;
    })

    this.routerActive.params.pipe(
      switchMap(params =>{
        return this.postService.getById(params['id']);
      })).subscribe(post => {
      this.post = post;
      this.form = new FormGroup({
        selectCategory: new FormControl(this.post.selectCategory, [Validators.required]),
        title: new FormControl(this.post.title, [Validators.required]),
        description: new FormControl(this.post.description, [Validators.required]),
        content: new FormControl(this.post.content, [Validators.required]),
        img: new FormControl(this.post.img, [Validators.required]),
      });
    });
    this.allPostsLS();
  }

  delete(obj:any):void{
    this.postService.deletePost(obj.id)
      .subscribe({
        next: (res) => {
          alert('Пост успешно удален!');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('При удалении поста возникли ошибки!');
        }
      });
  }

  addLocalStoragePost(){
    this.disable = true;
    this.localStarage.addLs(this.post, this.post.id);
    // alert('Добавлен в избранные');
  }

  allPostsLS(){
    this.localStarage.getLs('posts').forEach((item:any) => {
      console.log(this.postId.id)
      console.log(item.id)
      if(this.postId.id === item.id){
        this.disable = item.favorite;
      }
    });
  }

  submit():void {
      if (this.form.invalid) {
        return;
      }

      this.postService.editPost({
        ...this.post,
        selectCategory: this.form.value.selectCategory,
        title: this.form.value.title,
        description: this.form.value.description,
        content: this.form.value.content,
        img: this.form.value.img,
        data: new Date(),
      }).subscribe(res => {
        this.router.navigate(['/']);
      });
  }
}
