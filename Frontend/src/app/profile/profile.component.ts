import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Post } from '../entities/post';
import { FollowService } from '../follow.service';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  posts;
  currentUserId: string;
  currentUser: boolean;
  userId: string;
  number_followers: number;
  following: boolean = false;
  follow_id: string
  number_page: number;

  profileForm: FormGroup;
  image: File;
  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute,
    private followService: FollowService, private router: Router, private cookieService: CookieService, private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      img: new FormControl()
    })
  }

  ngOnInit(): void {
    if (this.cookieService.get('jwt') == "") {
      this.router.navigate(['login'])
    }
    this.route.params.subscribe(params => {
      this.userId = params.id;

    })


    this.userService.getProfile().subscribe((result) => {
      this.currentUserId = result._id;
      if (this.userId == null || this.currentUserId == this.userId) {

        this.currentUser = true;
        this.userService.getProfile().subscribe((result) => {
          this.user = result;

        })
        this.followService.getFollow(this.currentUserId).subscribe((result) => {
          this.number_followers = result.number_followers;
        })
        this.postService.getPost(1).subscribe((result) => {
          this.posts = result.page
          this.number_page = result.len
        })
      }
      else {

        this.userService.getUserById(this.userId).subscribe((result) => {
          console.info(result)
          this.user = result;
        })

        this.postService.getPostByUserId(this.userId).subscribe((result) => {
          this.posts = result
        })
        this.followService.getFollow(this.userId).subscribe((result) => {
          this.number_followers = result.number_followers;
        })
        this.followService.getUserFollow(this.userId).subscribe((result) => {
          this.following = result.follow
          this.follow_id = result.follow_id
        })
      }
    })

  }

  follow() {

    if (this.following == false) {
      this.following = true;

      this.number_followers++
      this.followService.addFollow(this.userId).subscribe((result) => {
        this.follow_id = result._id;

      })
    }


  }
  unfollow() {

    if (this.following == true) {
      this.following = false;
      this.number_followers--
      this.followService.deleteFollow(this.follow_id).subscribe((result) => {

      })

    }


  }
  getDetails(id: any) {

    let post = this.posts.filter((val) => {
      return val._id == id
    })
    this.postService.changeMessage(post)
    this.router.navigate(['post-details']);

  }

  changePage(page: number) {
    this.postService.getPost(page).subscribe((result) => {
      this.posts = result.page;
    })
  }

  changeImg(event: any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
    }
    let fd = new FormData();
    if (this.image) {

      fd.append('image', this.image, this.image.name)
      this.userService.changeImg(fd).subscribe((result) => {
        this.ngOnInit()

      })
      this.userService.updateProfileImg(this.profileForm.value.img).subscribe((result) => {
        this.ngOnInit()
      })

    }


  }

}
