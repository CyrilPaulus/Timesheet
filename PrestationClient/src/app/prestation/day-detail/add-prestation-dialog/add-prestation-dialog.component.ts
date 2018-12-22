import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Day } from '../../prestation.component';
import { FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { CodeChantierService, CodeChantier } from 'src/app/core/code-chantier.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Prestation } from 'src/app/core/prestation.service';
import { DurationPipe } from '../../duration.pipe';

@Component({
  selector: 'app-add-prestation-dialog',
  templateUrl: './add-prestation-dialog.component.html',
  styleUrls: ['./add-prestation-dialog.component.css']
})
export class AddPrestationDialogComponent implements OnInit {

  public form: FormGroup;
  public codeChantiers: CodeChantier[];

  public filteredOptions: Observable<CodeChantier[]>;

  public get codeChantier(): AbstractControl {
    return this.form.get('codeChantier');
  }

  public get description(): AbstractControl {
    return this.form.controls['description'];
  }

  public get duration(): AbstractControl {
    return this.form.controls['duration'];
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public prestation: Prestation,
    private dialogRef: MatDialogRef<AddPrestationDialogComponent>,
    private codeChantierService: CodeChantierService,
    private durationPipe: DurationPipe
  ) { }

  ngOnInit() {
    this.codeChantierService.getAll().subscribe(x => {
      this.codeChantiers = x;

      this.filteredOptions = this.codeChantier.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filter(value))
        );
    });

    let codeChantierValue = this.prestation ? this.prestation.codeChantier : '';
    let description = this.prestation ? this.prestation.description : '';
    let duration = this.prestation ? this.durationPipe.transform(this.prestation.duration) : '';
    this.form = new FormGroup({
      codeChantier: new FormControl(codeChantierValue, [Validators.required, this.getOptionsValidator()]),
      description: new FormControl(description, Validators.required),
      duration: new FormControl(duration, this.getDurationValidator())
    });


  }

  private filter(value: string): CodeChantier[] {
    const filterValue = value.toLowerCase();

    return this.codeChantiers.filter(option => option.code.toLowerCase().includes(filterValue));
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public save() {
    let codeChantier = this.codeChantier.value;
    let description = this.description.value;
    let duration = this.parseDuration(this.duration.value);

    let prestation = {
      codeChantier: codeChantier,
      description: description,
      duration: duration
    };
    this.dialogRef.close(prestation);

  }

  private getOptionsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      let missing = this.codeChantiers && this.codeChantiers.filter(x => x.code === value).length === 0;

      return missing ? { 'missing': { value: control.value } } : null;
    };
  }

  private getDurationValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      let duration = true;

      // decimal hours
      if (!isNaN(value))
        duration = false;

      // hour
      if (/^\d+h\d+$/.test(value))
        duration = false;
      // hour diff
      if (/^\d+h\d+\s*-\s*\d+h\d+$/.test(value))
        duration = false;

      return duration ? { 'duration': { value: control.value } } : null;
    };
  }

  private parseDuration(value: string): number {
    if (!isNaN(<any>value))
      return parseFloat(value);

    let hourReg = /^(\d+)h(\d+)$/;
    let matches = value.match(hourReg);

    if (matches)
      return parseInt(matches[1]) * 60 + parseInt(matches[2]);

    let diffRourReg = /^(\d+)h(\d+)\s*-\s*(\d+)h(\d+)$/;
    matches = value.match(diffRourReg);
    console.log(matches);
    if (matches)
      return (parseInt(matches[3]) * 60 + parseInt(matches[4])) - (parseInt(matches[1]) * 60 + parseInt(matches[2]));
  }
}
