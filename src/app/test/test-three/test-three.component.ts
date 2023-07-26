import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-test-three',
  templateUrl: './test-three.component.html',
  styleUrls: ['./test-three.component.scss']
})
export class TestThreeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isExpanded = false;

  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
      console.log("isShowing: " , this.isShowing);
      console.log("isExpanded: " , this.isExpanded);
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
      console.log("isShowing: " , this.isShowing);
      console.log("isExpanded: " , this.isExpanded);
    }
  }
}
