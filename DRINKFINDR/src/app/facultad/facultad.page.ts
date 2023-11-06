import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bebederos } from '../interfaces/bebederos';
import { FirestoreService } from '../services/firestore.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.page.html',
  styleUrls: ['./facultad.page.scss'],
})
export class FacultadPage implements OnInit {
  facultad: string = '';
  bebederosList: Bebederos[] = [];
  id:string = ''
  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.facultad = this.id;
      this.setBebederosList();
    });
  }

  async setBebederosList() {
    this.firestoreService
      .getListaBebederos()
      .then(async (result) => {
        this.bebederosList = result.filter(item => item.Facultad === this.id);
      })
      .catch((error) => {
        this.showMsg({ header: 'Error', msg: error.message });
      });
  }

  async showMsg({header, msg}: any){
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
