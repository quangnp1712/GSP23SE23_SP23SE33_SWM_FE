import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageService } from '../services/image.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss'],
})
export class LandlordComponent implements OnInit {
  public username = localStorage.getItem('usernameLogined');
  public role = localStorage.getItem('role');
  public url:any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private image: ImageService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  public avatarUrl = '';
  ngOnInit(): void {

  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/Login'], { relativeTo: this.route });
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  toggle() {
    const panelBody = document.querySelectorAll<HTMLElement>(
      '.mat-expansion-panel-body'
    );
    if (this.isExpanded == true) {
      for (let i = 0; i < panelBody.length; i++) {
        panelBody[i].style.padding = '0 0 0 16px';
      }
    } else {
      for (let i = 0; i < panelBody.length; i++) {
        panelBody[i].style.padding = '0';
      }
    }
  }

}
