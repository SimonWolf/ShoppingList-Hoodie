import {Component, NgZone, Input, OnInit} from "angular2/core";
import {FORM_PROVIDERS, FormBuilder, Validators,ControlGroup} from "angular2/common";


import {HoodieService} from "../../services/hoodie.service";


@Component({
    selector: "[login]",
    templateUrl: "/components/login/login.directive.html",

})
export class LoginDirective {
    loginForm:ControlGroup;
    username:String;
    public hoodie:any;


    constructor(private _ngZone:NgZone, builder:FormBuilder, _hoodieService:HoodieService) {
        this.hoodie = _hoodieService.hoodie;
        this.loginForm = builder.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    login(x) {
        console.log('login');
        console.log(x.status);
        if (x.status == "VALID") {
            this.hoodie.account.signIn(x.value.username, x.controls.password.value);
        }
        else{console.log("notvalid")}
    }

    sociallogin(x) {
        this.hoodie.account.socialLogin("facebook")
            .done((data)=> {
                console.log(data);
            })
            .fail((err)=> {
                console.log(err);
            });
    }

    register(x) {
        console.log('register');

        this.hoodie.account.signUp(x.controls.username.value, x.controls.password.value);
    }

}