import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent implements OnInit {

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
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
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
    this.userService.create(code, firstName, lastName).subscribe(x => {
      this.dialogRef.close(true);
    })

  }

}
