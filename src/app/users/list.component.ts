﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    interval = null;
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getCurrent()
            .pipe(first())
            .subscribe(users => this.users = users);
            this.interval= setInterval (() => {
               this.accountService.recordSession()
                .pipe(first())
                .subscribe();
            },5000);
    }
    onChange(value){
        if(value=='p'){
            this.accountService.getCurrent()
            .pipe(first())
            .subscribe(users => this.users = users);
        }
        else{
            this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
        }
    }

    ngOnDestroy(){
        if (this.interval) {
            clearInterval(this.interval);
         }
         
    }
}