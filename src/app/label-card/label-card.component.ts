import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AdsFromEbay } from '../models/adFromEbay';

@Component({
  selector: 'app-label-card',
  templateUrl: './label-card.component.html',
  styleUrls: ['./label-card.component.scss'],
})
export class LabelCardComponent implements OnInit {
  @Input() ad: AdsFromEbay;
  @Input() hideReviewButton = false;
  @Output() getNextAd = new EventEmitter();

  constructor(private apiService: ApiService, public toastController: ToastController) { }

  ngOnInit() { }


  getImages = () =>
    this.ad?.pictures?.picture?.map(p => p?.link?.find(x => x?.rel === 'large')?.href);


  async setLabel(id, value: boolean, review = false) {
    this.ad = null;
    const toast = await this.toastController.create({
      header: 'Gespeichert',
      position: 'top',
      duration: 3000,
      buttons: [{
        text: 'Rückgängig',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.apiService.updateAd({ id, toReview: true }).subscribe(res => this.handleSuccess(res), error => this.handleError(error));
        }
      }
      ]
    });
    await toast.present();
    this.getNextAd.emit();

    const { role } = await toast.onDidDismiss();
    if (role === 'timeout') {
      console.log('runAPI');
      if (review) {
        this.apiService.updateAd({ id, toReview: review }).subscribe(res => this.handleSuccess(res), error => this.handleError(error));
      } else {
        this.apiService.updateAd({ id, labeledDecision: value })
          .subscribe(res => this.handleSuccess(res), error => this.handleError(error));
      }
    }
  }

  async handleSuccess(res) {
    console.log('success', res);
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Label wurde gespeichert',
      duration: 2000
    });
    toast.present();
  }

  async handleError(res) {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Es ist ein Fehler aufgetreten. Bitte neu laden',
      duration: 2000
    });
    toast.present();
  }

}
