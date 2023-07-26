import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit{
  public comfirmPassword=""  ;
  public username = "";
  public otp = "";
  public newPassword = "";
  constructor(  private router: Router,private aRoute: ActivatedRoute, private imageService:ImageService) { }

  ngOnInit(): void {
  }

  public getOtp() {
    console.log(this.username)

  }
  public inputOtp() {
    console.log(this.username)

  }
  public inputPassword() {
    console.log(this.username)

  }
}
