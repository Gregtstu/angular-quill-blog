import { Component, OnInit } from '@angular/core';
import {PostService} from "../../settings/services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public postId:any;
  public post:any;
  constructor(private postServ:PostService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.params.subscribe(res => {
      this.postId = res;
    });
    this.postServ.getById(this.postId.id).subscribe(res => {
      console.log(res)
      this.post = res;
    });
  }

}
