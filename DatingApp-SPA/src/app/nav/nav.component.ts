import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) {
  }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
      this.alertify.success('Logged in successfully');
    }, err => {
      this.alertify.error(err);
    }, () => {
      this.router.navigate(['/members'])
        .catch(err => this.alertify.error('An error occurred: ' + err));
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home'])
      .catch(err => this.alertify.error('An error occurred: ' + err));
  }
}
