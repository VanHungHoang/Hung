import { Component, OnInit } from '@angular/core';
import { ApiService } from "app/services/api.service";
import { Author } from "app/model/author.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  ngOnInit(){}
}
