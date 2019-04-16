import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getNewReleases() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQBGXTaKM-ZPfeAr_u3PU330bMmo6peGlzKnYdnaeglToVEPPHW1gUOfl-69E1ppddeA7777NtSiHJ2TdpY'
    });
    return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
      .pipe(map(data => data['albums'].items));
  }

  getArtist(term: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQBGXTaKM-ZPfeAr_u3PU330bMmo6peGlzKnYdnaeglToVEPPHW1gUOfl-69E1ppddeA7777NtSiHJ2TdpY'
    });
    return this.http.get(`https://api.spotify.com/v1/search?q=${term}&type=artist&limit=15`, { headers })
      .pipe(map(data => data['artists'].items));

  }
}
