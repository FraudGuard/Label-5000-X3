import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AdsFromEbay } from '../models/adFromEbay';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  ad: AdsFromEbay;
  adAnalyzed;
  notFound;

  constructor(private apiService: ApiService, public toastController: ToastController) { }

  ngOnInit() {
    this.getNextAd();
  }

  getNextAd() {
    this.notFound = false;
    this.apiService.getToReviewAd().subscribe(async res => {
      console.log('AD', res);
      if (res instanceof AdsFromEbay) {
        console.log('instanceMatched');
        this.ad = res;

        // eslint-disable-next-line no-underscore-dangle
        this.apiService.getAdById(res._id).subscribe(res2 => {
        console.log('----',res2);
        this.adAnalyzed = res2
        });
      } else {
        const toast = await this.toastController.create({
          color: 'danger',
          message: 'Es ist ein Fehler aufgetreten. Bitte neu laden',
          duration: 2000
        });
        toast.present();
      }
    }, err => {
      console.log('errorLoading', err);
      this.notFound = true;
    });
  }
}
