import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { UserServiceProvider } from '../providers/user-service/user-service';

import { IonicStorageModule } from '@ionic/storage'
import { RewardServiceProvider } from '../providers/reward-service/reward-service';

import { RewardModalPageModule } from '../pages/reward-modal/reward-modal.module'
import { FCM } from '@ionic-native/fcm'
import { MenuServiceProvider } from '../providers/menu-service/menu-service';

export const firebaseConfig = {
  apiKey: "AIzaSyDi1yVxdqGSWb1rvbYRcZ2_Ku0Okon1-5Y",
  authDomain: "wiredbrain-a7c12.firebaseapp.com",
  databaseURL: "https//wiredbrain-a7c12.firebaseio.com",
  storageBucket: "wiredbrain-a7c12.appspot.com",
  messagingSenderId: "454152484217"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    RewardModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    RewardServiceProvider
    ,FCM,
    MenuServiceProvider
  ]
})
export class AppModule {}
