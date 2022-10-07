import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../../settings/services/local-storage.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private localStorage:LocalStorageService) { }

  ngOnInit(): void {
  }


}
