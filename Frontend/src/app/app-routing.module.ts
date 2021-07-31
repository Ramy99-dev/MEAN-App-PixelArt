import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"home" , component:HomeComponent
  },
  {
    path:'login' , component:LoginComponent
  },
  {
    path:'register' , component:RegisterComponent
  },
  {
    path:'profile' , component:ProfileComponent
  },
  {
    path:'profile/:id' , component:ProfileComponent
  },
  {
    path:'gallery' , component:GalleryComponent
  },
  {
    path:'add-gallery' , component:AddGalleryComponent
  },
  {
    path:'post-details' , component:PostDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
