import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData= {
    email_fr_db :'',
    fullname_fr_db :'',
    uid_fr_db: '',
    createdOn_fr_db:''
  }

  constructor(private router: Router, private ngdb: AngularFireDatabase, private ngAuth: AngularFireAuth, private afm:AngularFireModule) {
    this.GetUserData();
   }

  GetUserData(){
   this.ngAuth.user.subscribe(auth => {
     if(auth){
       //get user data here by passing this uid
       console.log(auth.uid);


      this.ngdb.list("/users/"+auth.uid).query.get().then( (r)=>{

        this.userData.fullname_fr_db = r.val()._name;
        this.userData.email_fr_db = r.val()._email;
        this.userData.uid_fr_db = r.val()._uid;
        this.userData.createdOn_fr_db = r.val()._created;

        // console.log('getting data fromfdb __' +this.userData.fullname_fr_db);
      }).catch(e =>{
        alert(e);
      })
  
     }
   })
  }

  LogMeOut(){
    this.ngAuth.signOut().then( ()=>{
      this.router.navigateByUrl('/login', {replaceUrl: true});
    });
    
  }

}
