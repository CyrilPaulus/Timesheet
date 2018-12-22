import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CodeChantier, CodeChantierService } from 'src/app/core/code-chantier.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-import-code-chantier-dialog',
  templateUrl: './import-code-chantier-dialog.component.html',
  styleUrls: ['./import-code-chantier-dialog.component.css']
})
export class ImportCodeChantierDialogComponent implements OnInit {

  public form: FormGroup;

  public get file(): AbstractControl {
    return this.form.controls['file'];
  }

  constructor(
    private dialogRef: MatDialogRef<ImportCodeChantierDialogComponent>,
    private codeChantierService: CodeChantierService
  ) {
    this.form = new FormGroup({
      file: new FormControl('', Validators.required),
    })

  }

  ngOnInit() {
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public save() {
    let file = <FileInput>this.file.value;


    this.codeChantierService.import(file).subscribe(x => {
      this.dialogRef.close(true);
    })

  }

}
