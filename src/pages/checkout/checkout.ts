import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartServiceProvider} from '../../providers/cart-service/cart-service'
import { UserServiceProvider} from '../../providers/user-service/user-service'

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage implements OnInit {
  
  order: any[];
  orderTotal: number;
  customer: any;

  rewardsDisplay: boolean
  discountUsed: boolean = false
  rewardsList: any[] = []
  discount: any
  discountAmount: number = 0
  discountTotal: number = 0

  ngOnInit(): void {
    this.cartService.getCart()
      .then(theCart => this.order = theCart)
      .then(cart => this.sumTotal(cart))
      .then(sum => this.orderTotal = sum)
      .then(cash => this.userService.returnUser())
      .then(cust => this.loadRewards(cust))      
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cartService: CartServiceProvider, public userService: UserServiceProvider) {
  }

  sumTotal(order){
    return Promise.resolve(order.reduce((total: number, item: any) => total + item.price, 0))
  }

  removeOne(itemId, itemPrice){
    if (this.discountTotal != 0){
      let tempTotal = this.discountTotal - itemPrice
      if (tempTotal <= 0){
        this.userService.displayAlert('Unable to Apply', 'You cannot apply rewards that create a credit')
        this.removeReward
      }
      else{
        // remove item, calc new total, then apply discount to new total
        this.cartService.removeItem(itemId, itemPrice);
        this.sumTotal(this.order)
          .then(sum => this.orderTotal = sum)
          .then(dis => this.discountTotal = dis - this.discount.amount)
      }
    }
    else{
      this.cartService.removeItem(itemId, itemPrice);
      this.sumTotal(this.order)
        .then(sum => this.orderTotal = sum)
    }
  }

  addRewards(){
    this.rewardsDisplay = (this.rewardsDisplay) ? false: true;
  }

  loadRewards(user){
    this.userService.storageControl('get', `${user}-rewards`)
      .then(returned => {
        this.customer = user
        
        if (!returned){
          let tempObj = {rewardId: 'No rewards generated', amount: 0}
          this.rewardsList.push(tempObj)
        }
        else{
          this.rewardsList = returned
        }
      })
  }

  applyReward(reward){
    let tempAmount = this.orderTotal - reward.amount

    if (tempAmount <= 0){
      this.userService.displayAlert('Unable to apply', 'You cannot apply rewards that create a credit')
    }
    else{
      this.discount = reward
      this.discountAmount = reward.amount
      this.discountTotal = this.orderTotal - reward.amount
      this.discountUsed = true
    }
  }

  removeReward(){
    this.discountUsed = false
    this.discount = ''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}
