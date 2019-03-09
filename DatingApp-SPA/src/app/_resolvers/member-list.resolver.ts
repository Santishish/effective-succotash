import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PaginatedResult} from '../_models/paginatedResult';

@Injectable()
export class MemberListResolver implements Resolve<PaginatedResult<User[]>> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
    return this.userService.getUsers(this.pageNumber, this.pageSize)
      .pipe(catchError(() => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/'])
            .catch(() => this.alertify.error('An error occurred'));
          return of(null);
        })
      );
  }
}
