import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public title: string;
  public content: string;
  public cancelLabel: string;
  public validateLabel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {
    this.title = data.title;
    this.content = data.content;
    this.cancelLabel = data.cancelLabel;
    this.validateLabel = data.validateLabel;
  }

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public validate() {
    this.dialogRef.close(true);
  }

}
