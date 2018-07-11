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

  route:any = [
    {
      lat: 41.421616,
      lng: -96.465819
    },
    {
      lat: 41.421624,
      lng: -96.464529
    },
    {
      lat: 41.418848,
      lng: -96.464615
    },
    {
      lat: 41.418880,
      lng: -96.465538
    },
    {
      lat: 41.421616,
      lng: -96.465819
    }
  ]

  infoWindow = new google.maps.InfoWindow;

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

    new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Hello world',
      animation: google.maps.Animation.DROP,
      label: 'You',
      icon: "https://static.xx.fbcdn.net/images/emoji.php/v9/f5d/2/16/1f3c6.png"
    });

    let routeLine = new google.maps.Polyline({
      path: this.route,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
    });
    routeLine.setMap(this.map);

    // Open the InfoWindow on mouseover:
    google.maps.event.addListener(routeLine, 'mouseover', (event) => {
       this.infoWindow.setPosition(event.latLng);
       this.infoWindow.setContent('Example text');
       this.infoWindow.open(this.map);
    });

  }

  goToNewRoutePage(){
    this.nav.push(NewRoutePage);
  }

}
