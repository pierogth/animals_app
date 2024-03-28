import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Animal } from './animal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent {

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }
 animalForm = this.fb.group({

  name: ['', [Validators.required, Validators.minLength(3)]],

  type: ['', [Validators.required]],

  gender: ['', [Validators.required]],

  species: ['', [Validators.required]],

  age: [1, [Validators.required, Validators.min(1)]],

  weight: [1, [Validators.required, Validators.min(1)]],

  verse: ['', [Validators.required]]

});
  
  

  model = new Animal("pippo","cane","disne",12,"m",23,"YUK");

  submitted = false;

  onSubmit() { this.submitted = true; }

  cancel() {
    this.router.navigate(['/']); // redirect to the index page 
  }
  
  submitApplication(): void {
  if (this.animalForm.valid) {
    const animal = this.animalForm.value;
    if (animal) {
    this.submitAnimal(
    this.animalForm.value.name ?? '',
    this.animalForm.value.type ?? '',
    this.animalForm.value.gender ?? '',
    this.animalForm.value.species ?? '',
    this.animalForm.value.age ?? 1,
    this.animalForm.value.weight ?? 1,
    this.animalForm.value.verse ?? '',
  );
    }
  } else {
    // Mark all controls as touched to show validation errors
    this.animalForm.markAllAsTouched();
    console.log(this.animalForm)
    //alert("Tutti i campi sono obbligatori!")
  }
}
 
  submitAnimal(name: string, type: string, gender: string, species:string, age:number,weight:number,verse:string) {
    const animal = {
                    name,
                    type,
                    gender,
                    species,
                    age,
                    weight,
                    verse
                    };


  this.http.post<String>('http://localhost:3000/animals', animal).subscribe(response => {

        this.router.navigate(['/']); // redirect to the index page

  });
}

}