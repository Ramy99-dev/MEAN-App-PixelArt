import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { ParticlesModule } from 'ngx-particle';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';


import { UserService } from './user.service';
import { GalleryComponent } from './gallery/gallery.component';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { PostService } from './post.service';
import { PostDetailsComponent } from './post-details/post-details.component';
import { JwtInterceptor } from './jwt.interceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AnotherNavBarComponent } from './another-nav-bar/another-nav-bar.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    GalleryComponent,
    AddGalleryComponent,
    PostDetailsComponent,
    NavBarComponent,
    AnotherNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFullpageModule,
    ParticlesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule
 
  
  ],
  providers: [UserService,CookieService , PostService ,
     {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
     }
    ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
