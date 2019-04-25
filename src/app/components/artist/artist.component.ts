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

  loadingArtist: boolean;

  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
    this.loadingArtist = true;
    this.router.params.subscribe(params => {
      this.getArtist(params['id']);
    });
  }

  getArtist(id: string) {
    this.loadingArtist = true;

    this.spotifyService.getArtist(id).subscribe(artist => {
      console.log(artist);

      this.artist = artist;
      this.loadingArtist = false;

    });
  }

}
