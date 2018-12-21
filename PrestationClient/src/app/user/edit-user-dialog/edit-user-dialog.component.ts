import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService, User } from 'src/app/core/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  public form: FormGroup;

  public get code(): AbstractControl {
    return this.form.controls['code'];
  }

  public get firstName(): AbstractControl {
    return this.form.controls['firstName'];
  }

  public get lastName(): AbstractControl {
    return this.form.controls['lastName'];
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      code: new FormControl(user.code, Validators.required),
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required)
    })
  }

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public save() {
    let code = this.code.value;
    let firstName = this.firstName.value;
    let lastName = this.lastName.value;
    this.userService.update(this.user, code, firstName, lastName).subscribe(x => {
      this.dialogRef.close(true);
    })

  }

}
