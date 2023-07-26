import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<Dialog>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  closeDialog(): void {
    if (localStorage.getItem('accept-landlord-detail') === 'true') {
      this.dialogRef.close();
      localStorage.setItem('accept-landlord-detail', '');

    } else if (localStorage.getItem('action-pending') === 'true') {
      this.dialogRef.close();
      localStorage.setItem('action-pending', '');

    }
    else if (localStorage.getItem('blocHomestay') === 'true') {
      this.dialogRef.close();
      localStorage.setItem('blocHomestay', '');

    }
    else if (localStorage.getItem('Homestay') === 'true') {
      this.dialogRef.close();
      localStorage.setItem('Homestay', '');

    }
    else this.dialogRef.close();
  }
  ngOnInit(): void {
    if (localStorage.getItem('accept-landlord-detail') === 'true') {
      this.dialogRef.disableClose = true;
    }
  }
}
