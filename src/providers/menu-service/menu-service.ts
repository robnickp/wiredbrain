import { Injectable } from '@angular/core';

import Promise from 'promise-polyfill'

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuServiceProvider {

  cafe: any[] = [
    {id:'cof', name: 'Coffee', Description: 'The classic standard, our exclusive select blend',
    img: 'assets/imgs/coffee.jpg', small: 1.50, medium: 2.50, large: 3.25},
    {id:'lat', name: 'Latte', Description: 'The classic latte, our exclusive select blend',
    img: 'assets/imgs/latte.jpg', small: 2.50, medium: 1.25, large: 3.25},
    {id:'moc', name: 'Mocha', Description: 'The classic mocha, our exclusive select blend',
    img: 'assets/imgs/mocha.jpg', small: 3.50, medium: 3.13, large: 3.25},
    {id:'esp', name: 'Espresso', Description: 'The classic espresso, our exclusive select blend',
    img: 'assets/imgs/espresso.jpg', small: 5.50, medium: 3.47, large: 3.25},
    {id:'cap', name: 'Cappuccino', Description: 'The classic cappuccino, our exclusive select blend',
    img: 'assets/imgs/cappuccino.jpg', small: 2.22, medium: 3.33, large: 3.25},
    {id:'ame', name: 'Americano', Description: 'The classic americano, our exclusive select blend',
    img: 'assets/imgs/coffee.jpg', small: 4.44, medium: 3.50, large: 3.25},
    {id:'mac', name: 'Macchiato', Description: 'The classic macchiato, our exclusive select blend',
    img: 'assets/imgs/macchiato.jpg', small: 7.66, medium: 4.50, large: 3.25}
  ]

  constructor() {
    console.log('Hello MenuServiceProvider Provider');
  }

  getCafeDb(){
    return Promise.resolve(this.cafe)
  }

  getOne(search){
    let foundId = this.cafe.map(x => x.id).indexOf(search);
    let single = this.cafe[foundId];
    return Promise.resolve(single);
  }
}
