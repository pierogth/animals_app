import { Component, OnInit } from '@angular/core';
import { Animal } from './animals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  animals: Animal[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals() {
    this.http.get<Animal[]>('http://localhost:3000/animals').subscribe(animals => {
      this.animals = animals;
    });
  }
}