import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  login() {
    this.authService.login(this.form.value).then(() => {
      this.router.navigate(['/home'])
    }).catch((error) => {
      this.showMsg({'header':'Error', 'msg':error.message})
    })
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
