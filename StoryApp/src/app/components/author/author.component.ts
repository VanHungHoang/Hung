import { Component, OnInit } from '@angular/core';
import { ApiService } from "app/services/api.service";
import { Author } from "app/model/author.model";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  authors: Author[];
  _authorSearch: Author[]
  authorName: string;
  authorId: number;
  searchauthorName:string;
  constructor(private _api: ApiService) { }
  ngOnInit() {
    this.getAuthor();
  }
  getAuthor() {
    this._api.getApi("http://localhost:54902/api/authors")
      .subscribe(data => {
        this.authors = data;
        console.log(data[0].authorName);
      });
  }
  searchAuthor() {
    console.log(1)
    if (this.searchauthorName != "") {
      this._api.getApi("http://localhost:54902/api/authors/"+this.searchauthorName)
        .subscribe(data => {
          this._authorSearch = data;
      console.log(2);
        });

    }
  }

}
