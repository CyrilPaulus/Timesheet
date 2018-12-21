import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeChantierService, CodeChantier } from '../core/code-chantier.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { EditCodeChantierDialogComponent } from './edit-code-chantier-dialog/edit-code-chantier-dialog.component';
import { CreateCodeChantierDialogComponent } from './create-code-chantier-dialog/create-code-chantier-dialog.component';
import { DialogService } from '../dialogs/dialog.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-code-chantier',
  templateUrl: './code-chantier.component.html',
  styleUrls: ['./code-chantier.component.css']
})
export class CodeChantierComponent implements OnInit {

  public dataSource = new MatTableDataSource<CodeChantier>();
  public columns: string[] = ['code', 'description', 'actions'];

  @ViewChild(MatTable)
  public table: MatTable<CodeChantier>;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(
    private codeChantierService: CodeChantierService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.codeChantierService.getAll().subscribe(x => {
      this.refresh();
    });
  }

  public edit(codeChantier: CodeChantier) {
    let dialogRef = this.dialog.open(EditCodeChantierDialogComponent, {
      width: '400px',
      data: codeChantier
    });

    dialogRef.afterClosed().subscribe(x => {
      this.refresh();
    });
  }

  public create() {
    let dialogRef = this.dialog.open(CreateCodeChantierDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(x => {
      this.refresh();
    });
  }

  public delete(codeChantier: CodeChantier) {
    let title = `Suppression ${codeChantier.code}`;
    let content = `Êtes-vous sûr de vouloir supprimer le code chantier <em>${codeChantier.code}</em> ?`;
    this.dialogService.showConfirm(title, content).subscribe(x => {
      if (x)
        this.codeChantierService.delete(codeChantier).subscribe(y => {
          this.refresh()
        });
    })
  }

  public refresh() {
    this.codeChantierService.getAll().subscribe(x => {
      this.dataSource.data = x;
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
