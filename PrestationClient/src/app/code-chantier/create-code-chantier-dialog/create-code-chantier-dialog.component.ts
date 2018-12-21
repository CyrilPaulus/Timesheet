import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CodeChantier, CodeChantierService } from 'src/app/core/code-chantier.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-code-chantier-dialog',
  templateUrl: './create-code-chantier-dialog.component.html',
  styleUrls: ['./create-code-chantier-dialog.component.css']
})
export class CreateCodeChantierDialogComponent implements OnInit {

  public form: FormGroup;

  public get code(): AbstractControl {
    return this.form.controls['code'];
  }

  public get description(): AbstractControl {
    return this.form.controls['description'];
  }

  constructor(
    private dialogRef: MatDialogRef<CreateCodeChantierDialogComponent>,
    private codeChantierService: CodeChantierService
  ) {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public save() {
    let description = this.description.value;
    let code = this.code.value;
    this.codeChantierService.create(code, description).subscribe(x => {
      this.dialogRef.close(true);
    })

  }

}
