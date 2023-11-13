import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get resena's id
    this.resenaID = this.activatedRouter.snapshot.params['id'];
  }

  resenaID: string = '';

}
