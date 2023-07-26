import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../pop-up/message/message.component';
import { UserService } from '../services/user.service';
declare var Tawk_API: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public username = localStorage.getItem('usernameLogined') as string;
  public role = localStorage.getItem('role');
  message !:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private image: ImageService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private http: UserService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  public avatarUrl = '';

  ngOnInit(): void {

    Tawk_API.hideWidget();
    this.username = localStorage.getItem('usernameLogined') as string;
    this.role = localStorage.getItem('role');
    if(this.role != "ADMIN" && this.router.url.includes('/Admin')){
      this.router.navigate(['/Landlord/Dashboard'], {
        relativeTo: this.route,});
    }

    this.http.getUserInfo(this.username).subscribe(
      async (data) => {
        this.avatarUrl= data['avatarUrl'];
        console.log(this.avatarUrl);
        if(this.avatarUrl === "default" || !data['avatarUrl']){
          this.avatarUrl = await this.image.getImage('admin/avatar/'+ 'default.png');
          console.log(this.avatarUrl);
        }else {
          try {
            this.avatarUrl = await this.image.getImage('admin/avatar/'+ data['avatarUrl']);
          console.log(this.avatarUrl);
          } catch (error) {
            this.avatarUrl = await this.image.getImage('admin/avatar/'+ 'default.png');
            console.log(this.avatarUrl);
            console.log(error);
          }

        }
      },
      (error) => {
        console.log(error.message);
        this.message = error.message;
        this.openDialogMessage();
      }
    );
  }
  public logout() {
    Tawk_API.showWidget();
    localStorage.clear();
    console.log('token' , localStorage.getItem('userToken'));
    this.router.navigate(['/Login'], { relativeTo: this.route });

  }

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }


}
