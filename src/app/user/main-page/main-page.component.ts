import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from "../../settings/services/api.service";
import {IPosts} from "../../settings/interfaces/iposts";
import {LocalStorageService} from "../../settings/services/local-storage.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],

})
export class MainPageComponent implements OnInit {
  public displayedColumns: string[] = ['selectCategory', 'title'];
  public dataSource!: MatTableDataSource<any>;
  public posts!: any[];
  public favorite: boolean = false;
  public post!: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getAllPosts();
    if(this.localStorage.getLs('posts')){
      this.localStorage.getLs('posts').forEach((item:any) => {
        // console.log(item)
      })
    }
  }

  getAllPosts(): void {
    this.api.getAll().subscribe({
      next: (res) => {
        this.post = res

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Нет постов в базе данных. Перейди во вкладку "Создать", придумай новый пост и опубликуй!')
      }
    });

    this.posts = this.posts = this.localStorage.getLs('posts');

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
