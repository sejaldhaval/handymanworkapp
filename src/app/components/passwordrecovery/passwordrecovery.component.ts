import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.css']
})
export class PasswordrecoveryComponent implements OnInit {

  constructor(private router: Router) { }

  public passwordRecoveryForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
  });

  ngOnInit() {
  }

  passwordreset() {
    this.router.navigate(['/signin']);
  }

}
