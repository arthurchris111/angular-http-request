import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

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

  onCreatePost(postData:) {
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
      map((responseData => {
        const postArray = [];
        for (const key in responseData) {
          postArray.push({ ...responseData[key], id: key })
        }
        return postArray
      }))
    ).subscribe(posts => {
      console.log(posts)
    })
  }
}
