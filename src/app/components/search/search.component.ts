import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artists: any[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  search(term: string) {
    this.spotifyService.getArtist(term)
      .subscribe((data: any) => {
        this.artists = data.artists.items;
      });
  }
}
