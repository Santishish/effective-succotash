import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model)
      .subscribe(() => {
        console.log('Registration successful');
      }, error1 => console.log(error1));
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
