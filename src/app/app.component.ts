import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { post } from './post model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: post) {
    // Send Http request
    this.http.post('https://newproject-c866e-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseData => {
      console.log(responseData);
    })
    // console.log(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get('https://newproject-c866e-default-rtdb.firebaseio.com/posts.json').pipe(
      map((responseData: { [key: string]: post }) => {
        const postArray: post[] = [];
        for (const key in responseData) {
          postArray.push({ ...responseData[key], id: key })
        }
        return postArray
      })).subscribe(posts => {
        console.log(posts)
      })
  }
}
