import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<MessageComponent>
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('action-pending') === 'true') {
      this.dialogRef.disableClose = true;
    }
    if (localStorage.getItem('account-landlord-detail') === 'true') {
      this.dialogRef.disableClose = true;
    }
  }

  getReload() {
    if (localStorage.getItem('action-pending') === 'true') {
      this.dialogRef.close();
      localStorage.setItem('action-pending', '');

    }
    else if (localStorage.getItem('account-landlord-detail') === 'true') {
      this.dialogRef.close();
      localStorage.setItem('account-landlord-detail', '');

    }
    else this.dialogRef.close();
  }
}
