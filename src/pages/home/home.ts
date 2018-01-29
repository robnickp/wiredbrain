import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  menuData = [
    {title: 'Our Menu', pic:'assets/imgs/soup1.jpg', pushPage: 'MenuPage'},
    {title: 'Account', pic:'assets/imgs/coffee-people3.jpg', pushPage: 'AccountPage'},
    {title: 'About Us', pic:'assets/imgs/coffee6.jpg', pushPage: 'AboutPage'},
    {title: 'Locations', pic:'assets/imgs/cafe2.jpg', pushPage: 'LocationsPage'}
  ]

  logPage: any

  constructor(public navCtrl: NavController) {
    this.logPage = 'LoginPage'
  }

}
