import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Resenas } from '../interfaces/resenas';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bebedero',
  templateUrl: './bebedero.page.html',
  styleUrls: ['./bebedero.page.scss'],
})
export class BebederoPage implements OnInit {
  
  
  constructor(
    private activatedRouter:ActivatedRoute,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get the bebedero's id
    this.bebederoID = this.activatedRouter.snapshot.params['id'];
    // Get the bebedero's resenas list
    this.email = this.authService.getUserEmail() || ''
    
    this.getListaResenas();
    
  }
  
  bebederoID:string = '';
  resenas:Resenas[] = [];
  currentDate: string = new Date().toLocaleDateString();
  email:string= ''
  getListaResenas(){
    this.firestoreService.getListaResenas(this.bebederoID).then((result) => {
      this.resenas = result;
      result.forEach(r =>{
        console.log(r)
      })
    }).catch((error) => {
      this.showMsg({'header':'Error', 'msg':error.message})
    });
  }

  async showMsg({ header, msg }: any) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
