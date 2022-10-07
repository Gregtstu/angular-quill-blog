import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./user/main-page/main-page.component";
import {MainLayoutComponent} from "./user/shared/main-layout/main-layout.component";
import {FavoritePageComponent} from "./user/favorite-page/favorite-page.component";
import {CreatePageComponent} from "./user/create-page/create-page.component";
import {PostPageComponent} from "./user/post-page/post-page.component";
import {EditPageComponent} from "./user/edit-page/edit-page.component";

const routes: Routes = [
  {
    path:'', component:MainLayoutComponent, children:[
      {path:'', redirectTo:'/', pathMatch:'full'},
      {path:'', component:MainPageComponent},
      {path:'favorite', component:FavoritePageComponent},
      {path:'create', component:CreatePageComponent},
      {path:'post/:id', component:PostPageComponent},
      {path:'edit/:id', component:EditPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
