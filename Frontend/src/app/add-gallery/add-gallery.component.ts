import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Post } from '../entities/post';
import { PostService } from '../post.service';
@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.css']
})
export class AddGalleryComponent implements OnInit {
  image: File;
  addPostForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private postService: PostService) {
    this.addPostForm = formBuilder.group({

      title: new FormControl(),
      file: new FormControl(),
      desc: new FormControl()
    })
  }

  ngOnInit(): void {
  }
  fileChoosen(event: any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];

    }
  }
  addPost() {
    let fd = new FormData();
    if (this.image) {
      fd.append('image', this.image, this.image.name)

      this.postService.uploadImg(fd).subscribe((res) => {
      })
    }

    let post: Post = new Post(this.addPostForm.value.title, this.addPostForm.value.file, this.addPostForm.value.desc)
    this.postService.addPost(post).subscribe((res) => {
    })
  }

}
