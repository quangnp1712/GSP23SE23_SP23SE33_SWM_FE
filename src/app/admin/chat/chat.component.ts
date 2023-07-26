import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
constructor(
  private router: Router,
  private route: ActivatedRoute,
){}
ngOnInit(): void {
  this.role = localStorage.getItem('role');
  if(this.role == "LANDLORD" && this.router.url.includes('/Admin')){
    this.router.navigate(['/Landlord/Dashboard'], {
      relativeTo: this.route,});
  }

}
public role = localStorage.getItem('role');
}
