import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdsFromEbay } from './models/adFromEbay';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  toLabel;
  constructor(private http: HttpClient) { }

  getRandomAd() {
    this.count();
    return this.http.get(`${environment.api}/api/label/get`).pipe(map((u: any) => u.ad ? Object.assign(new AdsFromEbay(), u.ad) : u));
  }

  getToReviewAd() {
    return this.http.get(`${environment.api}/api/label/getToReview`)
      .pipe(map((u: any) => u.ad ? Object.assign(new AdsFromEbay(), u.ad) : u));
  }

  updateAd(body: Partial<AdsFromEbay>) {
    return this.http.post(`${environment.api}/api/label/update`, body);
  }

  count() {
    this.http.get(`${environment.api}/api/label/count`).subscribe((res:any) => {
      console.log('count', res);
      this.toLabel = res?.ad;
    });

  }
}
