import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { Storage } from '@ionic/storage'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  items: FirebaseListObservable<any>

  constructor(private afAuth: AngularFireAuth, public alertCtrl: AlertController,
            private storage: Storage, private fbDb: AngularFireDatabase) {
    this.items = fbDb.list('/users')
  }

  displayAlert(alertTitle, alertSub){
    let theAlert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    })
    theAlert.present()
  }

  logout(){
    //this.storageControl('delete')
    this.afAuth.auth.signOut()
      .then(loggedOut => this.displayAlert('Logged out', 'Come back and visit soon'))
      .catch(err => this.displayAlert('Error logging out', err))
  }

  storageControl(action, key?, value?){
    if (action == 'set'){
      return this.storage.set(key, value)      
    }
    
    if (action == 'get'){
      return this.storage.get(key)
    }

    if (action == 'delete'){
      if (!key){
        this.displayAlert('Warning', 'About to delete all user data')
        return this.storage.clear
      }
      else{
        this.displayAlert(key, 'Deleting this users data')
        return this.storage.remove(key)
      }
    }
  }

  saveNewUser(user){
    let userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new Date().toLocaleString,
      id: ''
    }
    this.items.push({
      username: user,
      creation: userObj.creation,
      logins: userObj.logins,
      rewardCount: userObj.rewardCount,
      lastLogin: userObj.lastLogin
    })
    .then(res => {
      userObj.id = res.key
      return this.storageControl('set', user, userObj)
    })

    return this.storageControl('get', user)

  }
}

