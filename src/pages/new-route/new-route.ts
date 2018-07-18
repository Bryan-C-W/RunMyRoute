import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-new-route',
  templateUrl: 'new-route.html',
})
export class NewRoutePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation:Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRoutePage');
  }

  startTracking(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe( (data) => {
      console.log(data);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

}
