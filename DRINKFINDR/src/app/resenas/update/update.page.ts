import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Resenas } from 'src/app/interfaces/resenas';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Get resena's id
    this.resenaID = this.activatedRouter.snapshot.params['id'];
  }

  form = this.formBuilder.group({
    resena: ['', [Validators.required]]
  });
  resenaID: string = '';
  resena: Resenas = {
    'ID':'',
    'autor': '',
    'bebedero': '',
    'fecha': '',
    'hora': '',
    'resena': ''
  };
  

  saveChanges() {
    let res = this.form.value.resena;
    console.log(res);
  }
}
