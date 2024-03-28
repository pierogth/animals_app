import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AnimalListComponent } from './animal-list/animal-list-component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
        BrowserModule,
      HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
         RouterModule.forRoot([
             { path: '', component: AnimalListComponent },
               { path: 'create-animal', component: AnimalFormComponent }
    ]), 
   
       
  ],
  declarations: [
    AppComponent,
      AnimalListComponent,
      AnimalFormComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


