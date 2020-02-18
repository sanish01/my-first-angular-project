import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosComponent} from './heros/heros.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
const routes: Routes=[
  {
    path:'dashboard', component: DashboardComponent
  },
  {
    path: 'heros', component: HerosComponent
  },
  {
    //yo chai default homepage ko lagi(route ko lagi)
    path: '', redirectTo:'/dashboard', pathMatch:'full'
  },
  {
    path:'detail/:id', component: HeroDetailComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
