/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AdsFromEbay } from '../models/adFromEbay';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  ad: AdsFromEbay;

  constructor(private apiService: ApiService, public toastController: ToastController) { }

  ngOnInit() {
    this.getNextAd();
  }

  getNextAd() {
    this.apiService.getRandomAd().subscribe(async res => {
      console.log('AD', res);
      if (res instanceof AdsFromEbay) {
        console.log('instanceMatched');
        this.ad = res;
      } else {
        const toast = await this.toastController.create({
          color: 'danger',
          message: 'Es ist ein Fehler aufgetreten. Bitte neu laden',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
