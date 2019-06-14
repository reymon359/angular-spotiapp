import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token = '';
  tokenTime = null;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  getToken() {
    const url = `http://localhost:3000/spotify`;
    const promise1 = new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) => {
        this.token = data.access_token;
        if (this.token !== '') {
          this.tokenTime = new Date();
          resolve();
        } else {
          reject();
        }
      });
    });

    return promise1;


  }
  
  checkToken(){
    if(this.tokenTime === null)
    
  }


  getQuery(query: string) {
    this.checkToken();
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=40')
      .pipe(map(data => data['albums'].items));
  }

  getArtists(term: string) {
    console.log(this.token);
    return this.getQuery(`search?q=${term}&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe(map(data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }
}
