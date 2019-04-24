import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertnotificationComponent } from './alertnotification/alertnotification.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      NgbModule
  ],
  declarations: [AlertnotificationComponent, GridComponent],
  exports: [
      AlertnotificationComponent
  ],
  providers: [AlertnotificationComponent]
})
export class SharedModule { }
