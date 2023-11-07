import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Bebederos } from '../interfaces/bebederos';
import { Facultades } from '../interfaces/facultades';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    // this.setBebederosList();
    this.setFacultadesList();
  }

  facultadesList: Facultades[] = [];

  // async setBebederosList() {
  //   this.firestoreService.getListaBebederos().then(async (result) => {
  //     this.bebederosList = result;
  //   }).catch((error) => {
  //     this.showMsg({'header':'Error','msg':error.message});
  //   })
  // }

  async setFacultadesList() {
    await this.firestoreService
      .getListaFacultades()
      .then((result) => {
        this.facultadesList = result;
      })
      .catch((error) => {
        this.showMsg({ header: 'Error', msg: error.message });
      });
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.showMsg({ header: 'Error', msg: error.message });
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
