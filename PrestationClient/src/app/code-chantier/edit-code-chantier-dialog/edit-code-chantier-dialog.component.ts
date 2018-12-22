import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CodeChantier, CodeChantierService } from 'src/app/core/code-chantier.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-code-chantier-dialog',
  templateUrl: './edit-code-chantier-dialog.component.html',
  styleUrls: ['./edit-code-chantier-dialog.component.css']
})
export class EditCodeChantierDialogComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public codeChantier: CodeChantier,
    private dialogRef: MatDialogRef<EditCodeChantierDialogComponent>,
    private codeChantierService: CodeChantierService
  ) {
    this.form = new FormGroup({
      code: new FormControl(this.codeChantier.code, Validators.required),
      description: new FormControl(this.codeChantier.description, Validators.required),
      client: new FormControl(this.codeChantier.client),
      produit: new FormControl(this.codeChantier.produit)
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
    this.codeChantierService.update(this.codeChantier, code, description, client, produit).subscribe(x => {
      this.dialogRef.close(true);
    })

  }

}
