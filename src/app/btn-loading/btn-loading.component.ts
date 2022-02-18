import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-btn-loading',
  templateUrl: './btn-loading.component.html',
  styleUrls: ['./btn-loading.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class BtnLoadingComponent implements OnInit {
  btnTitle = 'Reserve Now';
  isLoading: boolean = false;
  @Input() item!: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private api: ApiService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}
  getLoadingTitle(content: any): any {
    this.isLoading = true;
    this.btnTitle = 'Loading';
    this.modalService.open(content);
  }
  close(c: string) {
    this.modalService.dismissAll(c);
    this.isLoading = false;
    this.btnTitle = 'Reserve Now';
  }
  getCookie(key: any): any {
    let val = '';
    let x = document.cookie;
    let y = x.split(';');
    for (let i in y) {
      let test = y[i].split('=');
      if (test[0].trim() === key) {
        return test[1];
      }
    }
  }
  reserveUser(doctor: any, time: any) {
    const { hours, minutes } = time;
    const { _id, specialization, name } = doctor;
    this.api
      .reserveUser({
        hours,
        minutes,
        specialization,
        doctor_id: _id,
        doctor: name,
      })
      .subscribe((res) => console.log(res));
    this.api
      .reservingDoctor({
        _id,
        hours,
        minutes,
        patientName: this.getCookie('name'),
      })
      .subscribe((res) => console.log(res));
    location.reload();
  }
  checkTime(hours: any, minutes: any): Boolean {
    let nwDate = new Date();
    if (nwDate.getHours() > hours && nwDate.getMinutes() > minutes) {
      return false;
    } else {
      return true;
    }
  }
}
