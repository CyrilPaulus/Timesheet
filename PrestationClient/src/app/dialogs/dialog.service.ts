import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {


  }

  public showConfirm(title: string, content: string, validateLabel = 'Yes', cancelLabel = 'No'): Observable<boolean> {
    let ref = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        title: title,
        content: content,
        validateLabel: validateLabel,
        cancelLabel: cancelLabel
      }
    });

    return ref.afterClosed();
  }
}
