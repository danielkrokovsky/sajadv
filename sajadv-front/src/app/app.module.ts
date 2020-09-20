import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterModule, Routes } from '@angular/router';
import { CPFPipe } from './shared/cpf.pipe';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CPFPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
