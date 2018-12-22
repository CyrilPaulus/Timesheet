import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../prestation.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPrestationDialogComponent } from './add-prestation-dialog/add-prestation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Prestation, PrestationService } from 'src/app/core/prestation.service';
import { User } from 'src/app/core/user.service';
import { DialogService } from 'src/app/dialogs/dialog.service';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css'],
})
export class DayDetailComponent implements OnInit {

  @Input()
  public day: Day;

  @Input()
  public user: User;

  public dataSource = new MatTableDataSource<Prestation>();
  public columns: string[] = ['code', 'description', 'duration', 'actions'];

  constructor(
    private dialog: MatDialog,
    private prestationService: PrestationService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  public addPrestation() {
    let dialogRef = this.dialog.open(AddPrestationDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(x => {
      if (!x)
        return;

      this.doAddPrestation(x.codeChantier, x.duration, x.description);
    });
  }

  private refresh() {
    this.dataSource.data = this.day.prestations;
  }

  private doAddPrestation(codeChantier: string, duration: number, description: string) {
    this.prestationService.addPrestation(codeChantier, this.user.id, description, duration, this.day.date).subscribe(x => {
      this.day.prestations.push(x);
      this.refresh();
    });
  }

  public delete(prestation: Prestation) {
    let title = 'Suppression prestation';
    let content = 'Êtes-vous sûr de vouloir supprimer cette prestation ?';
    this.dialogService.showConfirm(title, content).subscribe(x => {
      if (!x)
        return;

      this.prestationService.delete(prestation.id).subscribe(x => {
        this.day.prestations = this.day.prestations.filter(x => x != prestation);
        this.refresh();
      });
    })
  }

  public edit(prestation: Prestation) {
    let dialogRef = this.dialog.open(AddPrestationDialogComponent, {
      width: '400px',
      data: prestation
    });

    dialogRef.afterClosed().subscribe(x => {
      if (!x)
        return;

      this.doEditPrestation(prestation, x.codeChantier, x.duration, x.description);
    });
  }

  private doEditPrestation(prestation: Prestation, codeChantier: string, duration: number, description: string) {
    this.prestationService.update(prestation, codeChantier, description, duration).subscribe(newPrestation => {
      let index = this.day.prestations.indexOf(prestation);
      this.day.prestations[index] = newPrestation;
      this.refresh();
    });
  }

}
