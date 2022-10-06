import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../../settings/services/api.service";
import {LocalStorageService} from "../../settings/services/local-storage.service";

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['selectCategory', 'title', 'favorite'];
  public dataSource!: MatTableDataSource<any>;
  public posts!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public post!: any;

  constructor(private api: ApiService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.posts = this.localStorage.getLs('posts');
    if (this.posts.length != 0) {
      this.dataSource = new MatTableDataSource(this.posts);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id:string) {
    this.posts = JSON.parse(localStorage.getItem('posts') || '{}');
    this.posts = this.posts.filter(item => item.id != id);
    this.localStorage.saveLs('posts', this.posts);
    this.getAllPosts();
  }
}
