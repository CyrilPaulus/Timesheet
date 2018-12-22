import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CodeChantierComponent } from './code-chantier/code-chantier.component';
import { PrestationComponent } from './prestation/prestation.component';
import { UserComponent } from './user/user.component';
import { CoreModule } from './core/core.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCodeChantierDialogComponent } from './code-chantier/edit-code-chantier-dialog/edit-code-chantier-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateCodeChantierDialogComponent } from './code-chantier/create-code-chantier-dialog/create-code-chantier-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialogs/dialog.service';
import { CreateUserDialogComponent } from './user/create-user-dialog/create-user-dialog.component';
import { EditUserDialogComponent } from './user/edit-user-dialog/edit-user-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DayDetailComponent } from './prestation/day-detail/day-detail.component';
import { AddPrestationDialogComponent } from './prestation/day-detail/add-prestation-dialog/add-prestation-dialog.component';
import { DurationPipe } from './prestation/duration.pipe';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    CodeChantierComponent,
    PrestationComponent,
    UserComponent,
    EditCodeChantierDialogComponent,
    CreateCodeChantierDialogComponent,
    ConfirmDialogComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    DayDetailComponent,
    AddPrestationDialogComponent,
    DurationPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    CoreModule
  ],
  providers: [DialogService, DurationPipe],
  bootstrap: [AppComponent],
  entryComponents: [
    EditCodeChantierDialogComponent,
    CreateCodeChantierDialogComponent,
    ConfirmDialogComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    AddPrestationDialogComponent
  ]
})
export class AppModule { }
