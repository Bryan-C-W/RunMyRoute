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

  routes:any = [
    {
      title: 'Wilmont Loop',
      color: '#b0b0b0',
      coordinates: [
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
        }
      ]
    },
    {
      title: 'Deerfield Sprint',
      color: '#44FF11',
      coordinates: [
        {
          lat: 41.421625,
          lng: -96.463958
        },
        {
          lat: 41.421676,
          lng: -96.468559
        }
      ]
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

    for(var i=0; i < this.routes.length; i++){
      let route = this.routes[i];

      let routeLine = new google.maps.Polygon({
        path: route.coordinates,
        geodesic: true,
        strokeColor: route.color,
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0,
      });
      routeLine.setMap(this.map);

      // Open the InfoWindow on mouseover:
      google.maps.event.addListener(routeLine, 'mouseover', (event) => {
         this.infoWindow.setPosition(event.latLng);
         this.infoWindow.setContent(`Title: ${route.title}`);
         this.infoWindow.open(this.map);
      });
    }

  }

  goToNewRoutePage(){
    this.nav.push(NewRoutePage);
  }

}
