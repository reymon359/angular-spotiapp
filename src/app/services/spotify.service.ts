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
      Authorization: 'Bearer BQA2su-CjWMIGvgKi-Ucz4Jy5NGYLlTHuB8GAnlee7Wf4CYwwkqADy-bP2gwdb_SlRYW5hvfh4Whi_WxMG0'
    });
    return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers });
  }

  getArtist(term: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQA2su-CjWMIGvgKi-Ucz4Jy5NGYLlTHuB8GAnlee7Wf4CYwwkqADy-bP2gwdb_SlRYW5hvfh4Whi_WxMG0'
    });
    return this.http.get(`https://api.spotify.com/v1/search?q=${term}&type=artist&limit=15`, { headers });

  }
}
