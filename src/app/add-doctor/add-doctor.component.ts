import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
interface AvailableHours {
  time: Number;
  _id: Number;
}
interface Doctor {
  changeTimeMode: Boolean;
  addingTimeMode: Boolean;
  still: Boolean[];
  timeFormated: any;
  isEdit: Boolean;
  _id: String;
  name: String;
  specialization: String;
  rates: Number[];
  gender: String;
  address: String;
  fees: Number;
  phone: Number;
  duration: Number;
  img: String;
  availableHours: AvailableHours[];
  __v: Number;
}
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Great!</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="dismiss()"
      ></button>
    </div>
    <div class="modal-body">
      <p style="color:green;font-weight:bold;">
        Doctor was successfully added!
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="close()">
        Close
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() name: any;
  constructor(public activeModal: NgbActiveModal) {}
  dismiss() {
    this.activeModal.dismiss('Cross click');
    location.reload();
  }
  close() {
    this.activeModal.close('Close click');
    location.reload();
  }
}
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements OnInit {
  newTime: String = '';
  times: any[] = [];
  public show = true;
  timeValue: Number = 5;
  selectedGender = 'Select Gender';
  selectedSpecialization: string = 'Select Specialization';
  myForm!: FormGroup;
  addingMode: Boolean = false;
  time = { hour: 13, minute: 30 };
  editMode: Boolean = false;
  doctorsArr: Doctor[] = [];
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private api: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDoctors();
    this.myForm = this.fb.group({
      specialization: ['', [Validators.required]],
      name: [
        '',
        [Validators.required, Validators.required, Validators.minLength(4)],
      ],
      gender: ['', [Validators.required]],

      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      availableHours: this.fb.array([]),
      duration: ['', Validators.required],
      fees: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.myForm.valueChanges.subscribe(console.log);
  }
  get availableHours() {
    return this.myForm.get('availableHours') as FormArray;
  }
  get duration() {
    return this.myForm.get('duration');
  }
  get fees() {
    return this.myForm.get('fees');
  }
  get specialization() {
    return this.myForm.get('specializtion');
  }
  get phone() {
    return this.myForm.get('phone');
  }
  get name() {
    return this.myForm.get('name');
  }
  get address() {
    return this.myForm.get('address');
  }
  get age() {
    return this.myForm.get('age');
  }
  get gender() {
    return this.myForm.get('gender');
  }

  addDoctor(data: any) {
    this.api.addDoctor(data).subscribe((res: any) => {
      console.warn(res);
      if (res.status === 'Doctor Added Successffully') {
        this.open();
        this.addingMode = false;
      }
    });
  }

  addTime() {
    const Time = this.fb.group({
      hours: '',
      minutes: '',
    });
    this.availableHours.push(Time);
  }

  deleteTime(i: number) {
    this.availableHours.removeAt(i);
  }
  fetchDoctors() {
    this.api.getDoctors().subscribe((response: any) => {
      if (Array.isArray(response)) {
        response.forEach((element: Doctor) => {
          this.times.push(element.timeFormated);
          element.isEdit = false;
          element.still = [];
          element.availableHours.forEach((x) => {
            element.still.push(true);
          });
          this.doctorsArr.push(element);
        });
      } else {
        console.log(response);
      }
    });
  }
  deleteDoctor(data: any) {
    this.api.deleteDoctor(data).subscribe((res) => {
      location.reload();
    });
  }
  editDoctor(data: any) {
    data.isEdit = true;
  }
  saveDoctor(doctor: any) {
    doctor.isEdit = false;
    if (this.selectedGender === 'Select Gender') {
      alert('Saving failed: Please select a gender');
    }
    if (this.selectedSpecialization === 'Select Specialization') {
      alert('Saving failed: Please Select specialization');
    }
    doctor.gender = this.selectedGender;
    doctor.specialization = this.selectedSpecialization;
    this.editDoctorApi(doctor._id, doctor);
    location.reload();
  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
  saveTime(timeAvailable: any, timer: any, doctor: any, index: any) {
    doctor.availableHours[index].hours = +timer.value.split(':')[0];
    doctor.availableHours[index].minutes = +timer.value.split(':')[1];
    doctor.timeFormated[index] = timer.value;
  }
  removeTime(timeItem: any, timer: any, doctor: any, index: any) {
    doctor.availableHours.splice(index, 1);
    // this.draggableElement.nativeElement.remove();
    doctor.still[index] = false;
  }
  addAvailableTimeMode(doctor: any) {
    doctor.addingTimeMode = true;
  }
  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }
  addAvailableTime(doctor: any, TimeAdded: any, i: any) {
    let hrs = +TimeAdded.value.split(':')[0];
    let mins = +TimeAdded.value.split(':')[1];
    let obj = { hours: hrs, minutes: mins };
    if (!isNaN(mins)) {
      doctor.availableHours.push(obj);
      doctor.timeFormated.push(TimeAdded.value);
      this.editDoctorApi(doctor._id, doctor);
      location.reload();
    }
    doctor.addingTimeMode = false;
    console.log(doctor);
  }
  turnAddModeOn() {
    this.addingMode = true;
  }
  turnAddModeOff() {
    this.addingMode = false;
  }
  cancelAddingTime(doctor: any) {
    doctor.addingTimeMode = false;
  }

  editDoctorApi(id: any, data: any) {
    this.api.editDoctor(id, data).subscribe((res: any) => {
      console.log(res);
    });
  }
}
