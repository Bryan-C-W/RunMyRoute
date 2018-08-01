import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  first_name:string;
  last_name:string;
  password:string;
  email:string;
  username:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  handleSubmit(){
    console.log(this.first_name, this.last_name, this.email, this.username, this.password);
  
  if(this.password.length <= 6){
    alert('Password is too short');
    return;
  }

  let url = 'https://cors-anywhere.herokuapp.com/http://ptsv2.com/t/okb6k-1532481496/post';
  let postdata ={
    first_name:this.first_name,
    last_name:this.last_name,
    email:this.email,
    password:this.password,
    username:this.username
  }

  this.http.post(url, JSON.stringify(postdata)).subscribe( (result:any) => {
    console.log(result);
    alert("Regestration Sucssful");
    this.navCtrl.setRoot(LoginPage)
  });
  }

}
