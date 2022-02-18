import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit() {}
}
