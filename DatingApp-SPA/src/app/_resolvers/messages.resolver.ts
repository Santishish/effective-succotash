import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PaginatedResult} from '../_models/paginatedResult';
import {Message} from "../_models/message";
import {AuthService} from "../_services/auth.service";

@Injectable()
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]>> {
    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)
      .pipe(catchError(() => {
          this.alertify.error('Problem retrieving messages');
          this.router.navigate(['/'])
            .catch(() => this.alertify.error('An error occurred'));
          return of(null);
        })
      );
  }
}
