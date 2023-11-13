import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ResenaToSend } from 'src/app/interfaces/resenas';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private firestoreService: FirestoreService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Get the bebedero's id
    let author = this.authService.getUserEmail();
    console.log(author)
    this.bebederoID = this.activatedRouter.snapshot.params['id'];
  }

  bebederoID: string = '';
  form = this.formBuilder.group({
    resena: ['', [Validators.required]]
  });

  saveResena(){
    let res = this.form.value.resena;
    let author = this.authService.getUserEmail();
    console.log(author)
    
    if (res && author){
      let resena:ResenaToSend = {
        'ID': new Date().getTime().toString() + author,
        'autor': author,
        'bebedero': this.bebederoID,
        'resena': res
      };

      this.firestoreService.updateResena(resena).then(() => {
        this.showMsg({'header':'Reseña actualizada', 'msg':''});
      }).catch((error) => {
        this.showMsg({'header':'Error', 'msg':error.message})
      });

      this.firestoreService.updateResenasCount(this.bebederoID).then(() => {
        this.router.navigate(['/bebedero', this.bebederoID]);
      }).catch((error) => {
        this.showMsg({'header':'Error', 'msg':error.message})
      });
    };
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
