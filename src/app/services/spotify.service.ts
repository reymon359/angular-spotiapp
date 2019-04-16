import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQBGXTaKM-ZPfeAr_u3PU330bMmo6peGlzKnYdnaeglToVEPPHW1gUOfl-69E1ppddeA7777NtSiHJ2TdpY'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
       .pipe(map(data => data['albums'].items));
  }

  getArtist(term: string) {
    return this.getQuery(`search?q=${term}&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items));
  }
}
