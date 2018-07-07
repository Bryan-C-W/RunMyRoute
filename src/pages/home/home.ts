import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewRoutePage } from '../new-route/new-route';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public marker:any;
  public geolocationOptions:any = {
    enableHighAccuracy: true
  };
  public infoWindow:any = new google.maps.InfoWindow();

  public routes:any = [
    {
      title: 'Marion Ln Loop',
      type: 'loop',
      time: '2:12:455',
      coordinates: [
        {lat: 41.437321, lng: -96.458215},
        {lat: 41.438166, lng: -96.458140},
        {lat: 41.438102, lng: -96.455876},
        {lat: 41.437555, lng: -96.455082}
      ]
    },
    {
      title: 'Wilmont Killer',
      type: 'loop',
      time: '3:01:321',
      coordinates: [
        {lat: 41.421654, lng: -96.466864},
        {lat: 41.421650, lng: -96.464584},
        {lat: 41.418839, lng: -96.464613},
        {lat: 41.418887, lng: -96.465514},
        {lat: 41.421622, lng: -96.465825},
        {lat: 41.421654, lng: -96.466864}
      ]
    },
    {
      title: 'Wood Burner',
      type: 'loop',
      time: '2:41:231',
      coordinates: [
        {lat: 41.440877, lng: -96.460604},
        {lat: 41.442986, lng: -96.460523},
        {lat: 41.443062, lng: -96.459322},
        {lat: 41.441128, lng: -96.459520}
      ]
    },
    {
      title: '1st Street Sprint',
      type: 'sprint',
      time: '6:29:130',
      coordinates: [
        {lat: 41.429534, lng: -96.463773},
        {lat: 41.429639, lng: -96.483450}
      ]
    }
  ]

  constructor(public nav: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition(this.geolocationOptions).then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.initUserMarker();

      this.drawRoutes();

    }, (err) => {
      console.log(err);
    });

  }

  initUserMarker(){
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let watch = this.geolocation.watchPosition(this.geolocationOptions);
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log("Updating marker: ", data.coords.latitude, data.coords.longitude);
      this.updateMarker(data.coords.latitude, data.coords.longitude);
    });
  }

  updateMarker(lat, lng){
    var newLatLng = new google.maps.LatLng(lat, lng);
    this.marker.setPosition(newLatLng);
  }

  drawRoutes(){
    let routeLine;

    this.routes.forEach( (route:any) => {

      if(route.type == 'loop'){

        routeLine = new google.maps.Polygon({
          map: this.map,
          paths: route.coordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillOpacity: 0.0
          // fillColor: '#FF0000',
        });

      }else{

        routeLine = new google.maps.Polyline({
          map: this.map,
          path: route.coordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

      }

      // Open the InfoWindow on mouseover:
      google.maps.event.addListener(routeLine, 'mouseover', (event) => {
         this.infoWindow.setPosition(event.latLng);
         this.infoWindow.setContent(`${route.title} - ${route.time}`);
         this.infoWindow.open(this.map);
      });

      // Close the InfoWindow on mouseout:
      google.maps.event.addListener(routeLine, 'mouseout', () => {
         this.infoWindow.close();
      });

    }); // end this.routes.forEach

  }

  goToNewRoutePage(){
    this.nav.push(NewRoutePage);
  }

}
