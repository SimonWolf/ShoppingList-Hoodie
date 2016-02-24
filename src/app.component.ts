import {Component,NgZone,OnInit} from "angular2/core";
import {FORM_PROVIDERS, FormBuilder, Validators,ControlGroup,NgClass} from "angular2/common";
import {ROUTER_DIRECTIVES,RouteConfig} from "angular2/router";


import {HoodieService} from "./services/hoodie.service";
import {ValidationService } from "./services/validation.service";
import {ListDirective} from "./components/list/list.directive";
import {LoginDirective} from "./components/login/login.directive";
import {ControlMessages} from "./components/control-messages/control-messages.component";
declare var hello:any;

import {MATERIAL_DIRECTIVES, Media, SidenavService} from "ng2-material/all";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    directives: [ROUTER_DIRECTIVES, ListDirective, LoginDirective, ControlMessages, MATERIAL_DIRECTIVES, NgClass]

})


export class AppComponent implements OnInit {
    online:boolean = false;
    profilepic:string;
    username:string;
    loginForm:ControlGroup;
    backdrop:boolean = false;
    actualList = {name: "", id: "", color: 0};

    name:string = "";
    title:string = "";
    listnames:any = [];
    newlistname:string = "";
    public hoodie:any;


    constructor(private _ngZone:NgZone, builder:FormBuilder, _hoodieService:HoodieService, public sidenav:SidenavService) {
        this.hoodie = _hoodieService.hoodie;
        this.loginForm = builder.group({
            username: ["", Validators.compose([Validators.required])],
            password: ["", Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {

        if (this.hoodie.account.username) {
            this.loginForm.value.username = this.hoodie.account.username;
            this.username = this.hoodie.account.username;
            this.online = true;
            this.hoodie.store.findAll("listnames")
                .done((listnames) => {
                    this._ngZone.runOutsideAngular(()=> {
                        this.listnames = listnames;
                        this._ngZone.run(() => {
                            console.log("updated listnames");
                        });
                    });
                });

        }

        this.hoodie.store.on("listnames:add", (newTodoObject:any) => {
            this._ngZone.runOutsideAngular(()=> {
                this.listnames.push(newTodoObject);
                this._ngZone.run(() => {
                    console.log("list added");
                });
            });
        });

        this.hoodie.store.on("listnames:remove", (delTodoObject:any) => {
            this._ngZone.runOutsideAngular(()=> {
                for (var x in this.listnames) {
                    if (this.listnames[x].id === delTodoObject.id) {
                        this.listnames.splice(x, 1);
                    }
                }
                this._ngZone.run(() => {
                    console.log("list removed");
                });
            });

        });

        this.hoodie.account.on("signup signin", (username:string) => {
            this._ngZone.runOutsideAngular(()=> {
                this.online = true;
                this.username = username;
                this.loginForm.value.username = username;
                this.hoodie.store.findAll("listnames").done((res:any) => {
                    this.listnames = res;
                });
                this._ngZone.run(() => {
                    console.log("signin / signup");
                });
            });

        });

        this.hoodie.account.on("signout", () => {
            this._ngZone.runOutsideAngular(()=> {
                this.online = false;
                this.loginForm.value.username = "";
                this.newlistname = "";
                this.actualList = {name: "", id: "", color: 0};
                this.profilepic = "";
                this.username = "";
                this.listnames = [];
                this._ngZone.run(() => {
                    console.log("signout");
                });
            });

        });

        hello.on("auth.login", (auth)=> {
            console.log(auth);
            // Call user information, for the given network
            hello(auth.network).api("/me").then((r) => {
                // Inject it into the container
                console.log(r);
                this.profilepic = r.picture;
                console.log(this.profilepic);
                this.hoodie.account.signIn(r.name, r.id).fail(()=> {
                    this.hoodie.account.signUp(r.name, r.id);
                });

            });
        });

    }


    logout() {
        this.online = false;
        this.profilepic = "";
        hello("google").logout();
        this.hoodie.account.signOut(this.loginForm.value.username, this.loginForm.value.password);
    }

    addtodo() {
        this.hoodie.store.add("todo", {title: this.title});
    }

    deleteTodo(id:number) {
        this.hoodie.store.remove("todo", id);
    }

    newlist() {
        this.hoodie.store.add("listnames", {"name": this.newlistname});
    }

    showList(name, id) {

        this.actualList.name = name;
        this.actualList.id = id;
    }

    open(name:string) {
        this.sidenav.show(name);
    }

    close(name:string) {
        this.sidenav.hide(name);
        this.backdrop = false;

    }

}
