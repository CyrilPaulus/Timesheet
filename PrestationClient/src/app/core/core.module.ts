import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeChantierService } from './code-chantier.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CodeChantierService,
    UserService
  ]
})
export class CoreModule { }
