import {Component, OnInit} from '@angular/core';
import {PostService} from "../../settings/services/post.service";
import {ActivatedRoute} from "@angular/router";
import {LocalStorageService} from "../../settings/services/local-storage.service";
import {MatDialog} from "@angular/material/dialog";




@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public postId: any;
  public post: any;
  public disableded!: boolean;

  constructor(
    private postServ: PostService,
    private rout: ActivatedRoute,
    private localStorage: LocalStorageService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.rout.params.subscribe(res => {
      this.postId = res;
    });
    this.postServ.getById(this.postId.id).subscribe(res => {
      this.post = res;
    });
    if(this.localStorage.getLs('posts')){
      this.localStorage.getLs('posts').forEach((item:any) => {

      })
    }
  }

  addFavorite(id: string): void {
    this.disableded = true;
    this.localStorage.addLs(this.post, this.postId.id);
  }

  openDialog() {
    // this.dialog.open(DialogComponent, {
    //   width: '40%'
    // })
  }
}
