import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeChantierService } from './code-chantier.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CodeChantierService
  ]
})
export class CoreModule { }
