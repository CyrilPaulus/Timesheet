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

  public get client(): AbstractControl {
    return this.form.controls['client'];
  }

  public get produit(): AbstractControl {
    return this.form.controls['produit'];
  }

  constructor(
    private dialogRef: MatDialogRef<CreateCodeChantierDialogComponent>,
    private codeChantierService: CodeChantierService
  ) {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      client: new FormControl(''),
      produit: new FormControl('')
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
    let client = this.client.value;
    let produit = this.produit.value;
    this.codeChantierService.create(code, description, client, produit).subscribe(x => {
      this.dialogRef.close(true);
    })

  }

}
