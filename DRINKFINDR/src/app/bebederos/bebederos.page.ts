import { Component, OnInit } from '@angular/core';
import { Bebederos } from '../interfaces/bebederos';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-bebederos',
  templateUrl: './bebederos.page.html',
  styleUrls: ['./bebederos.page.scss'],
})
export class BebederosPage implements OnInit {
  bebederosList: Bebederos[] = [];
  constructor(
    private alertController: AlertController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.setBebederosList();
  }

   setBebederosList() {
     this.firestoreService
      .getListaBebederos()
      .then((result) => {
        this.bebederosList = result;
      })
      .catch((error) => {
        console.log('Error');
        this.showMsg({ header: 'Error', msg: error.message });
      });
  }

  async showMsg({ header, msg }: any) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['No'],
    });
    await alert.present();
  }

}
