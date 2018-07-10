import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewRoutePage } from '../new-route/new-route';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public nav: NavController) {

  }

  ionViewDidLoad(){
    console.log('Getting to ionViewDidLoad()');
    this.loadMap();
  }

  loadMap(){
    console.log("Getting to loadMap()");
    let latLng = new google.maps.LatLng(41.422058, -96.466820);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  goToNewRoutePage(){
    this.nav.push(NewRoutePage);
  }

}
