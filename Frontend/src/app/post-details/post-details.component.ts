import { Component, OnInit } from '@angular/core';
import { LikeService } from '../like.service';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any;
  liked: boolean;
  like_id: string;
  like_number: number;
  user: any;
  constructor(private postService: PostService, private likeService: LikeService, private userService: UserService) { }

  ngOnInit(): void {
    this.postService.currentMessage.subscribe(message => {
      this.post = message[0]



    })

    this.likeService.getUserLike(this.post._id).subscribe((result) => {
      this.liked = result.like;
      this.like_id = result.like_id;
    })
    this.likeService.getPostLikes(this.post._id).subscribe((result) => {
      this.like_number = result.likes_number


    })
    this.userService.getUserById(this.post.user).subscribe((result) => {
      this.user = result
      console.info(this.user)
    })


  }
  addLike(id: string) {

    if (this.liked == false) {
      this.liked = true;
      this.like_number += 1;
      const subscription = this.likeService.addLike(id).subscribe((res) => {



      })
      subscription.unsubscribe()

    }

  }
  dislike() {
    if (this.liked == true) {
      this.like_number -= 1;
      this.liked = false;
      const subscription = this.likeService.deleteLike(this.like_id).subscribe((result) => {

      })
      subscription.unsubscribe()

    }
  }

  visitProfile() {

  }

}
