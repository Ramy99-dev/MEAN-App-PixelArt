import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../entities/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  posts = Array<any>();
  number_page: number;
  connected: boolean;
  constructor(private postService: PostService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.cookieService.get('jwt') == "") {
      this.connected = false;
    }
    this.postService.getAllPosts(1).subscribe((result) => {
      this.posts = result.page;
      this.number_page = result.len;
    })

  }

  getDetails(id: any) {

    let post = this.posts.filter((val) => {
      return val._id == id
    })
    this.postService.changeMessage(post)
    this.router.navigate(['post-details']);

  }
  changePage(page: number) {
    this.postService.getAllPosts(page).subscribe((result) => {
      this.posts = result.page;
    })
  }


}
