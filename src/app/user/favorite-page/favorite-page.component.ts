import {Component, OnInit, ViewChild} from '@angular/core';
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
export class FavoritePageComponent implements OnInit {
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
    if (this.posts.length !=0) {
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      alert('У тебя нет избранных постов!');
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
