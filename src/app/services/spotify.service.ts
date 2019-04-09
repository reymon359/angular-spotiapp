import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getNewReleases() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQCHM8Y_uk313l7xhmQ-gUnLNijk9vI-wLaA8oXgQyg-65t4arThuR-AB9VOQcp0yl6iL-MuGxCRjZ2xUSs'
    });
    this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
      .subscribe(data => {
        console.log(data);
      });
  }

}
