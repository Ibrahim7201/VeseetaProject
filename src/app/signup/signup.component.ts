import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CustomValidators } from './customvalidator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  myForm!: FormGroup;
  url!: any;
  Loading!: Boolean;
  invalidPasswordConfirmation: Boolean = false;
  invalidMail: Boolean = false;
  invalidImage: Boolean = false;
  allOK: Boolean = false;
  result!: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      phones: this.fb.array([]),
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [Validators.required, Validators.required, Validators.minLength(4)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
      passwordConfirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
    });
    this.myForm.valueChanges.subscribe(console.log);
  }
  get passwordConfirmation() {
    return this.myForm.get('passwordConfirmation');
  }

  get name() {
    return this.myForm.get('name');
  }
  get email() {
    return this.myForm.get('email');
  }
  get password() {
    return this.myForm.get('password');
  }
  get age() {
    return this.myForm.get('age');
  }
  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }
  addPhone() {
    const phone = this.fb.group({
      area: [],
      prefix: [],
      line: [],
    });
    this.phoneForms.push(phone);
  }

  deletePhone(i: number) {
    this.phoneForms.removeAt(i);
  }
  async userSignUp(data: any) {
    this.imageUpload();
    const interveral = setInterval(() => {
      if (typeof this.url !== 'undefined') {
        let newUser = data;
        if (
          this.url.code === 'Error in uploading img' ||
          typeof this.url !== 'string'
        ) {
          newUser.image = 'assets/default.png';
        } else {
          newUser.image = this.url;
        }

        this.api.signUp(newUser).subscribe((res: any) => {
          if (res.errors) {
            if (res.errors.passwordConfirmation) {
              this.invalidPasswordConfirmation = true;
            } else {
              this.invalidPasswordConfirmation = false;
            }
            if (res.errors.email) {
              this.invalidMail = true;
            } else {
              this.invalidMail = false;
            }
          } else {
            this.invalidMail = false;
            this.invalidPasswordConfirmation = false;
            this.invalidImage = false;
            this.allOK = true;
            console.warn(res);
            clearInterval(interveral);
            if (this.allOK) {
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
            }
          }
        });
      } else {
        this.Loading = true;
      }
    }, 500);
  }
  imageUpload() {
    this.url = undefined;
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('photo', imageBlob);
    this.api.uploadPhoto(file).subscribe((res: any) => {
      this.url = res;
    });
  }
  route() {
    this.router.navigate(['/login']);
  }
}
