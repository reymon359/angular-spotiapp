import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];
  loading = false;

  error: boolean;
  errorMessage: string;

  constructor(public spotifyService: SpotifyService) {
    // this.loading = true;
    this.error = false;
    this.spotifyService.checkToken();
    if (!this.spotifyService.firstRequest ) {console.log('geting new'); this.getNewReleases();  }
 

  }

  getNewReleases(){
    this.spotifyService.firstRequest = false;
    this.spotifyService.getNewReleases()
    .subscribe((data: any) => {
      this.newReleases = data;
      this.loading = false;
    }, (serviceError) => {
      this.loading = false;

      this.error = true;
      this.errorMessage = serviceError.error.error.message;
    });
  }

  ngOnInit() {
  }

}
