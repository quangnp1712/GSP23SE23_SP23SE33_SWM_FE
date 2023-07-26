import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { MessageComponent } from '../../pop-up/message/message.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login-landlord',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginLandlordComponent {
  constructor(
    private http: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private image: ImageService,
    private authService: SocialAuthService,
    public dialog: MatDialog,
  ) {}

  message !: any;
  user: any;
  loggedIn: any;

  async ngOnInit(): Promise<void> {

    if(localStorage.getItem('registerSuccess') === 'true'){
      this.message = localStorage.getItem('message');
      this.openDialogSuccess();
    }

    // logo
    this.logoImageUrl = await this.image.getImage('logo/logo-3.png');
    console.log(this.logoImageUrl);

    // Image
    this.loginRegisterImageUrl = await this.image.getImage(
      'homepage/login-register.jpg'
    );
    console.log(this.loginRegisterImageUrl);

    // Login with gmail
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
      console.log(this.user.name);
      console.log(this.user.email);
    });
  }

  hide = true;
  passwordFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  public getProfile() {
    this.http
      .login(
        this.usernameFormControl.value!,
        this.passwordFormControl.value!
      )
      .subscribe((data) => {
        localStorage.setItem('userToken', data['token']);
        localStorage.setItem('usernameLogined', data['username']);
        localStorage.setItem('role', data['roles']);
        localStorage.setItem('password', this.passwordFormControl.value as string );
        console.log(data);
        console.log(localStorage.getItem('role'));
        if (data['roles'][0] === 'LANDLORD') {
          this.router.navigate(['/Landlord/Dashboard'], {
            relativeTo: this.route,
          });
        } else if (data['roles'][0] === 'ADMIN') {
          this.router.navigate(['/Admin/Dashboard'], {
            relativeTo: this.route,
          });
        } else if(data['roles'][0] === 'PASSENGER'){
          localStorage.clear();
          sessionStorage.clear();
        this.message = 'Account passenger do not accept login';
        this.openDialogMessage();

        }

        else this.router.navigate([''], {
          relativeTo: this.route,
        });
      },error =>{
        console.log(error);
        this.message = error;
        this.openDialogMessage();
      });
  }

  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }

  // Image Url
  public loginRegisterImageUrl = '';
  public logoImageUrl = '';

  openDialogSuccess() {
    localStorage.setItem('registerSuccess', "");
    const timeout = 3000;
    const dialogRef = this.dialog.open(SuccessComponent, {
      data: this.message,
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
         dialogRef.close();
      }, timeout)
    })
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
