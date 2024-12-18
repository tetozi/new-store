import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  error$ = this.errorService.errorMessage$;

  constructor(private errorService: ErrorService ) { }

  close() {
    this.errorService.clearError();
  }
}
