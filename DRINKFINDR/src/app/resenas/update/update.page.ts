import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ResenaToSend, Resenas } from 'src/app/interfaces/resenas';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    // Get resena's id
    this.resenaID = this.activatedRouter.snapshot.params['id'];
    // Get the resena
    this.getResena();
  }

  form = this.formBuilder.group({
    resena: ['', [Validators.required]]
  });
  resenaID: string = '';
  resena: ResenaToSend = {
    'ID':'',
    'autor': '',
    'bebedero': '',
    'resena': ''
  };

  getResena() {
    this.firestoreService.getResena(this.resenaID).then((result) => {
      this.resena = result;
    }).catch((error) => {
      this.showMsg({'header':'Error', 'msg':error.message})
    })
  }  

  saveChanges() {
    let res = this.form.value.resena;
    
    if (res){
      this.resena.resena = res;

      this.firestoreService.updateResena(this.resena).then(() => {
        this.showMsg({'header':'Reseña actualizada', 'msg':''});
        this.router.navigate(['/bebedero', this.resena.bebedero])
      }).catch((error) => {
        this.showMsg({'header':'Error', 'msg':error.message})
      })
    };
  }

  deleteResena(){
    this.firestoreService.deleteResena(this.resenaID).then(()=>{
      this.router.navigate(['/bebederos'])
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
