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
      Authorization: 'Bearer BQAildIgki8KgofrQpjyAP77VMOSh8oBAWfcVD5wD7EwGvoe3PuaxpqCTSZSdczhcMGW3JfnDMrre4VI674'
    });
    return  this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers });
  }

}
