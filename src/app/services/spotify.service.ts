import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token = '';
  tokenDate = null;
  firstRequest = true;
  constructor(private http: HttpClient, private router: Router) {
    }



  getToken() {
    console.log('enters get token');

    const clientId = 'YOUR_CLIENTID';
    const clientSecret = 'YOUR_CLIENTSECRET';

    const url = `https://reymon359-spotify-token.herokuapp.com/spotify/${clientId}/${clientSecret}`;
    const promise1 = new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) => {
        this.token = data.access_token;
        if (this.token !== '') {
          this.tokenDate = new Date();
          console.log('token got');
          resolve();
        } else {
          reject();
        }
      });
    });

    return promise1;


  }

  /*
   * checkToken()
   * As the Spotify token lasts 1 hour (3600 sec) I will check the secs It has been
   * and if it is going to expire I will get a new one
   */
  checkToken() {
    console.log('enters check token');
    
    const actualTime: any = new Date();
    const secs = new Date(actualTime - this.tokenDate).getTime();
    console.log(secs);
    // console.log(secs);
    if (secs >= 3550000) { // In milliseconds
      // console.log('lets get token');
      this.getToken();
    }
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
