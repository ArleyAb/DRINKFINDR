import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {}

  form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    confirmedPassword: ['', [Validators.required]]
  });

  @ViewChild('passwordInput')passwordInput!:IonInput;
  @ViewChild('confirmedPasswordInput')confirmedpasswordInput!:IonInput;

  confirmedPasswordItemClass = '';
  errorMessage = '';
  confirmerdPasswordLabelColor = '';
  submitButtonStatus = true;
  submitButtonColor = 'medium';

  confirmPasswordsMatch(){
    if (this.passwordInput.value == this.confirmedpasswordInput.value) {
      this.confirmedPasswordItemClass = '';
      this.errorMessage = '';
      this.confirmerdPasswordLabelColor = '';
      this.submitButtonStatus = false;
      this.submitButtonColor = '';
    } else {
      this.confirmedPasswordItemClass = 'invalid';
      this.errorMessage = 'Passwords do not match';
      this.confirmerdPasswordLabelColor = 'danger';
      this.submitButtonStatus = true;
      this.submitButtonColor = 'medium';
    }
  }

  register(){
    this.authService.register(this.form.value).then(async () => {
      const alert = await this.alertController.create({
        header: 'Account created correctly',
        buttons: ['OK']
      });
      await alert.present();

      this.router.navigate(['/home']);
    }).catch(async (error) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK'],
      });
  
      await alert.present();
    })
  }

}
