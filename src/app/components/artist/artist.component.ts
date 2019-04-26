import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent {

  artist: any = {};
  topTracks: any[] = [];
  loadingArtist: boolean;

  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
    this.loadingArtist = true;
    this.router.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtist(id: string) {
    this.loadingArtist = true;

    this.spotifyService.getArtist(id).subscribe(artist => {

      this.artist = artist;
      this.loadingArtist = false;

    });
  }

  getTopTracks(id: string) {
    this.spotifyService.getTopTracks(id).subscribe(topTracks => {
      this.topTracks = topTracks;
      console.log(this.topTracks);

    });
  }
}
