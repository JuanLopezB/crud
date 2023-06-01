import { Component, OnInit } from '@angular/core';
import { User } from "../models/user.mode";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import {AngularFireAuth} from "@angular/fire/compat/auth"

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],

})
export class RegisterPage implements OnInit {

  user = {} as User;
  
constructor(private toastCtrl: ToastController,
            private loadingCtrl: LoadingController,
            private afAuth: AngularFireAuth,
            private navCrtrl: NavController
            ) { }

  ngOnInit() {
  }

  async register(user: User){
    if(this.formValidation()){
      //show loader
      let loader = this.loadingCtrl.create({
        message:"Please wait..."
      });
      (await loader).present();

      try{
        await this.afAuth.createUserWithEmailAndPassword(user.correo, user.password)
        .then(data => 
          console.log(data));

          //Redirect to home page

          this.navCrtrl.navigateRoot("home");

      }catch(e){
        this.showToast("5000 error...");
      }

//dismiss loader

(await loader).dismiss();

    }
  }

  formValidation(){

    //if(!this.user.cedula){
    //  this.showToast("Ingrese la cedula");
    //  return false;
    //}

    //if(!this.user.telefono){
    //  this.showToast("Ingrese el telefono");
    //  return false;
    //}
    
    if(!this.user.correo){
      this.showToast("Ingrese el correo");
      return false;
    }
  

  if(!this.user.password){
    this.showToast("Ingres la contraseña");
    return false;
  }

  //if(!this.user.nombre){
  //  this.showToast("Ingrese el nombre");
  //  return false;
  //}

  return true;
}

showToast(message: string){
  this.toastCtrl
  .create({
    message:message,
    duration: 3000
  })
  .then(toastData => toastData.present());
 }
}
