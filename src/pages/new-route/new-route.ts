import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-new-route',
  templateUrl: 'new-route.html',
})
export class NewRoutePage {

  newRouteCoordinates:any = [];
  tracking:boolean = false;
  routeName:string = '';

  constructor(public nav: NavController, public navParams: NavParams, private geolocation:Geolocation, private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRoutePage');
  }

  startTracking(){
    this.tracking = true;

    let watch = this.geolocation.watchPosition();
    watch.subscribe( (data) => {
      console.log("Watching for new data:", data);

      let newCoordinate = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
      }

      this.newRouteCoordinates.push(newCoordinate);

    });
  }

  stopTracking(){
    this.tracking = false;

    //TODO implement saving of data to external source
    let url = "http://ptsv2.com/t/okb6k-1532481496/post";

    let postData = {
      name: this.routeName,
      coordinates: this.newRouteCoordinates
    }

    console.log(url, postData);

    this.http.post(url, JSON.stringify(postData)).subscribe( (result:any) => {
      console.log(result);
    });

    this.nav.setRoot(HomePage);

  }

}
