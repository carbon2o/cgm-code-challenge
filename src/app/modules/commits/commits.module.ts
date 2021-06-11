import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitsRoutingModule } from './commits-routing.module';
import { CommitsComponent } from './commits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    CommitsComponent
  ],
  imports: [
    CommonModule,
    CommitsRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ]
})
export class CommitsModule { }
