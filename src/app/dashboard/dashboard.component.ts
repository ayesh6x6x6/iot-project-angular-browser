import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

//the main page for a user when they login/signup which has the map component within it
export class DashboardComponent implements OnInit {
  public loading = false;
  private authStatusSub: Subscription;
  date;
  //arrays for days and months to display to the user
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

  constructor(private http: HttpClient,private authService:AuthService) { }

  //angular lifecycle hook which executes logic upon creation of the component itself
  ngOnInit() {
    //setting the date which will be displayed to the user via string interpolation feature of angular
    const day = this.days[new Date().getDay()];
    const month = this.months[new Date().getMonth()];
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    this.date = `${day}, ${month} ${date}, ${year}`;  

    //logic for setting the spinner on/off when the user logs out
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.loading = false;
      }
    );
  }

  //method which will be executed when the user clicks on the sign out button
  onSignout(){
    this.loading = true;
    this.authService.logout();  //calling the logout method of the auth service
  }

}
