import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor() {
        
    }
    ngOnInit() {
    }
}
