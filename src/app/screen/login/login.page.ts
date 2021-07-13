import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    email: '',
    password: ''
  }

  constructor(private router:Router , public ngAuth: AngularFireAuth) {

    // if(ngAuth.user != null){
    //   //user is already logged in
    //   this.router.navigateByUrl('/home', {replaceUrl: true});
    // }

   }

  ngOnInit() {
  }

  async LogMeIn(){

    const user = await this.ngAuth.signInWithEmailAndPassword(this.user.email,this.user.password).then( (r)=>{
      //login successful
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }).catch( e =>{
      //login failed
      console.log(e);
      alert(e);
    })                    
  }

}
