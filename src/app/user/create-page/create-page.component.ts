import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../settings/services/api.service";
import {IPosts} from "../../settings/interfaces/iposts";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})

export class CreatePageComponent implements OnInit {
    public quillConfig = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

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

    public formEditor!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api:ApiService) {
  }

  ngOnInit(): void {
    this.formEditor = this.formBuilder.group({
      selectCategory: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.formEditor.invalid) {
      return;
    }
    const post:IPosts = {
      selectCategory: this.formEditor.value.selectCategory,
      title: this.formEditor.value.title,
      description: this.formEditor.value.description,
      foto: this.formEditor.value.foto,
      content: this.formEditor.value.content,
      img: this.formEditor.value.img,
      favorite: false,
      data: new Date(),
      comments: []
    }

    this.api.addPost(post).subscribe({
      next: (res)=> {
        this.formEditor.reset();
        alert('Ваш пост успешно опубликован на главной странице!');
      },
      error: (err)=> {
        alert('ОШИБКА!!! Пост не опубликован!!!');
      }
    });
  }


}
