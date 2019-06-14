import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];
  loading: boolean = false;

  error: boolean;
  errorMessage: string;

  constructor(private spotifyService: SpotifyService) {
    // this.loading = true;
    this.error = false;
    // this.getNewReleases();
  
 

  }

  getNewReleases(){
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
