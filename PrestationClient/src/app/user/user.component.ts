import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { User, UserService } from '../core/user.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialogs/dialog.service';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public dataSource = new MatTableDataSource<User>();
  public columns: string[] = ['code', 'firstName', 'lastName', 'actions'];

  @ViewChild(MatTable)
  public table: MatTable<User>;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.userService.getAll().subscribe(x => {
      this.refresh();
    });
  }

  public refresh() {
    this.userService.getAll().subscribe(x => {
      this.dataSource.data = x;
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public create() {
    let dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(x => {
      this.refresh();
    });
  }

  public delete(user: User) {
    let title = `Suppression ${user.code}`;
    let content = `Êtes-vous sûr de vouloir supprimer l'utilisateur <em>${user.code}</em> ?`;
    this.dialogService.showConfirm(title, content).subscribe(x => {
      if (x)
        this.userService.delete(user).subscribe(y => {
          this.refresh()
        });
    })
  }

  public edit(user: User) {
    let dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(x => {
      this.refresh();
    });
  }

}
