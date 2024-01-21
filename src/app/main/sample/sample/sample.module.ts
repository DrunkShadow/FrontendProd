import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RepboxComponent } from '../repbox/repbox.component';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SampleComponent } from './sample.component';


import { HttpClientModule } from '@angular/common/http';


const routes = [
  {
    path: 'sample',
    component: SampleComponent,
    data: { animation: 'sample' }
  },
  
];

@NgModule({
  declarations: [SampleComponent,],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,HttpClientModule,RepboxComponent,CommonModule,],
  exports: [SampleComponent,]
})
export class SampleModule {}
