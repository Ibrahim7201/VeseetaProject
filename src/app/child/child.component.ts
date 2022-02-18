import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  ratingMode = false;
  //Data to be recived from parent
  @Input() item!: any;
  constructor(private api: ApiService) {}
  ngOnInit(): void {}
  addRate(doctor: any, rate: any) {
    this.api.addRating(doctor.id, { rate }).subscribe((res: any) => {
      console.log(res);
    });
  }
  turnRatingModeOn() {
    this.ratingMode = true;
  }
  rateAdded(item: any, rate: any) {
    if (rate.rate !== null) item.rated = rate.rate;
  }
  sendRate(item: any) {
    if (item.rated) {
      this.addRate(item, item.rated);
      location.reload();
    }
    this.ratingMode = false;
  }
  displayTimeAvialable(item: any): String {
    let x = item.timeFormated;
    let time = '';
    x.forEach((el: any, index: number) => (time += el + ' & '));
    let finTime = time.slice(0, -3);
    return finTime;
  }
}
