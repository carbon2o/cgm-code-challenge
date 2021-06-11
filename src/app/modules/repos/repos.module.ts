import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReposRoutingModule } from './repos-routing.module';
import { ReposComponent } from './repos.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ReposComponent
  ],
  imports: [
    CommonModule,
    ReposRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [
  ]
})
export class ReposModule { }
