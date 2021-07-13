import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    _name :'',
    email: '',
    password:'',
    uid:'',
  }

  constructor(private router:Router , private ngAuth: AngularFireAuth , private afDb: AngularFireDatabase) { }

  ngOnInit() {
  }

  async RegisterUser(){

    if(this.user.email && this.user.password, this.user._name){
      const user = await this.ngAuth.createUserWithEmailAndPassword(this.user.email,this.user.password).then( (r)=>{

        console.log(r);

        this.afDb.object('users/'+r.user.uid).set({
          _name: this.user._name,
          _email: this.user.email,
          _uid : r.user.uid,
          _created: Date.now()
          }).then( ()=>{
            this.router.navigateByUrl('/login', {replaceUrl: true});
          }).catch(e =>{
            //databse error
            console.log(e);
            alert(e);
          })
      }).catch( e =>{
        //authentication error ~ error
        console.log(e);
            alert(e);
      })
    }
    
  }

  GoToLogin(){
    this.router.navigateByUrl('/login', {replaceUrl:true});
  }
}
