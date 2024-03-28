import { Component } from '@angular/core';
import { Animal } from '../animals';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import {  AnimalDto } from '../animal.model';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list-component.html',
  styleUrls: ['./animal-list-component.css']
})
export class AnimalListComponent {

    public darkMode = false;

   

    animalsToCreate: AnimalDto[] = [{
        age: 10,
        gender: "Male",
        name: "Lion",
        species: "Mammifer",
        type: "Predator",
        verse: "ROOHAAARRRR!",
        weight: 72
    },
    {
        age: 12,
        gender: "Female",
        name: "Dog",
        species: "Mammifer",
        type: "Domestic",
        verse: "BauBauCaiCaiCai!",
        weight: 7
        },
    {
        age: 14,
        gender: "Male",
        name: "Beetle",
        species: "Insect",
        type: "Insect",
        verse: "Buzz!",
            weight: 7
        },
    {
        age: 41,
        gender: "Female",
        name: "Turtle",
        species: "Fish?",
        type: "Anphyb",
        verse: ".........",
            weight: 7
        },
    {
        age: 13,
        gender: "Male",
        name: "Tiger",
        species: "Felin",
        type: "Predator",
        verse: "ROOOAAAHHHHRRRRR!",
            weight: 7
        },
    {
        age: 3,
        gender: "Male",
        name: "Red Fish",
        species: "Fish",
        type: "prey",
        verse: "Buzz!",
            weight: 7
        },
    {
        age: 7,
        gender: "Female",
        name: "Shark",
        species: "Fish",
        type: "Predator",
        verse: "glugluglugluglu",
            weight: 7
        },
    {
        age: 8,
        gender: "Male",
        name: "cat",
        species: "Felin",
        type: "Domestic",
        verse: "MAAAOOOOO!",
            weight: 7
        },];
    /*   Another way for creating random animals...

    animalNames = ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 'Penguin', 'Polar Bear', 'Gorilla', 'Hippopotamus', 'Rhinoceros', 'Walrus', 'Seal', 'Crocodile', 'Alligator', 'Shark', 'Whale', 'Dolphin', 'Octopus', 'Squid', 'Crab', 'Lobster', 'Shrimp', 'Clam', 'Oyster', 'Mussel', 'Snail', 'Slug', 'Worm', 'Fly', 'Mosquito', 'Spider', 'Scorpion', 'Ant', 'Bee', 'Wasp', 'Butterfly', 'Moth', 'Beetle', 'Grasshopper', 'Cricket', 'Caterpillar', 'Dragonfly', 'Damselfly', 'Mayfly', 'Lacewing'];
    animalVerses = ['Roar!', 'Growl!', 'Squeak!', 'Chirp!', 'Hoot!', 'Buzz!', 'Bark!', 'Squawk!', 'Squeal!', 'Ribbit!', 'Hiss!', 'Roar!', 'Squeak!', 'Snap!', 'Snap!', 'Gulp!', 'Splash!', 'Click!', 'Squirt!', 'Scuttle!', 'Snap!', 'Snap!', 'Snap!', 'Clap!', 'Clap!', 'Clap!', 'Slither!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!', 'Buzz!'];
    
  creteRandomAnimals(num: number, animalsToCreate: AnimalDto[]) {
        for(let i = 0; i < num; i++) {

            const name = this.animalNames[Math.floor(Math.random() * this.animalNames.length)];
            const type = ['Mammal', 'Bird', 'Reptile', 'Fish'][Math.floor(Math.random() * 4)];
            const species = `Species ${Math.floor(Math.random() * 10) + 1}`;
            const age = Math.floor(Math.random() * 50);
            const gender = ['Male', 'Female'][Math.floor(Math.random() * 2)];
            const weight = Math.floor(Math.random() * 500);
            const verse = this.animalVerses[Math.floor(Math.random() * this.animalVerses.length)];
            animalsToCreate.push({ name, type, species, age, gender, weight, verse });

}
    } */

    animals: Animal[] = [];
    
    isDarkmode = false;

  constructor(private http: HttpClient) {}
  

    ngOnInit() {
        this.getAnimals();
        this.switchDarkMode(false);              
    }

    switchDarkMode(sw: boolean): void {
        sw ? this.darkMode = !this.darkMode : this.darkMode = localStorage.getItem('isDarkmode') === "true";;
    localStorage.setItem('isDarkmode', this.darkMode.toString())
    const switchToggle = document.querySelector('#switch-toggle');
    
    const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`

const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`

    if (this.darkMode) {

      document.body.classList.add('dark');

    } else {

      document.body.classList.remove('dark');

    }
//console.log(this.darkMode,switchToggle, darkIcon, lightIcon)
    if (this.darkMode && switchToggle) {
    switchToggle.classList.remove('bg-yellow-500','-translate-x-2')
        switchToggle.classList.add('bg-gray-700', 'translate-x-full')
    setTimeout(() => {
      switchToggle.innerHTML = darkIcon
    }, 250);
    } else if (switchToggle) {
        
        switchToggle.classList.add('bg-yellow-500','-translate-x-2')
    switchToggle.classList.remove('bg-gray-700','translate-x-full')
    
    setTimeout(() => {
      switchToggle.innerHTML = lightIcon
    }, 250);
  }

    }
    
 
    
  getAnimals() {
    this.http.get<Animal[]>('http://localhost:3000/animals').subscribe(animals => {
        this.animals = animals;
        // console.log(animals)
    });
  }

    truncate() {
    this.http.get<Animal[]>('http://localhost:3000/animals/delete/all').subscribe(animals => {
         this.getAnimals()
    });
  }

   createRandomAnimal() {
    this.http.post<String>('http://localhost:3000/animals/', this.animalsToCreate[Math.floor(Math.random() * this.animalsToCreate.length)]).subscribe(response => {
        this.getAnimals()
    });
  }

  eat(animal: { _id: string; }) {
    this.http.post<String>('http://localhost:3000/animals/' + animal._id + "/eat", null).subscribe(response => {
        this.getAnimals();
    });
  }
    
    sleep(animal: { _id: string; }) {
     this.http.post<String>('http://localhost:3000/animals/' + animal._id + "/sleep", null).subscribe(response => {
        this.getAnimals();
    });
    }
    
    speak(animal: { _id: string; }) {
        this.http.get<String>('http://localhost:3000/animals/' + animal._id + "/speak").subscribe(response => {
        //window.alert(response)
        //reset showText to off in all animals
        this.animals.forEach((animal)=>{
          animal.showText=false;
        })
        
        // Get the index of the animal in the `animals` array

    const index = this.animals.findIndex(a => a._id === animal._id);


    // If the animal is found in the array

    if (index !== -1) {

      // Set the `showText` property to true for that animal

      this.animals[index].showText = true;


      // Call the `typeText` function for that animal's verse

      this.typeText(response);

    }
    });
  }

  currentText: string = '';
  
  
  typeText(text: String) {

    this.currentText = '';
  
    for (let i = 0; i < text.length; i++) {
  
      setTimeout(() => {
  
        this.currentText += text[i];
  
      }, i * 100);
  
    }
  
  }

}
