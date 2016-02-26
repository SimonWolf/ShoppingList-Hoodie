import {Component, NgZone, Input, OnChanges} from "angular2/core";
import { SortListPipe } from "./../../services/sortList.pipe";
import { COLORS } from "./../../services/color.service";
import {OnInit} from "angular2/core";
import {MATERIAL_DIRECTIVES, Media, SidenavService} from "ng2-material/all";
declare var Hoodie:any;

@Component({
    selector: "[list]",
    pipes: [SortListPipe],
    templateUrl: "components/list/list.directive.html",
    inputs: ["list", "list_NAME", "hoodie", "list_ID"],
    directives: [MATERIAL_DIRECTIVES]
})


export class ListDirective implements OnChanges,OnInit {

    private hoodie;

    private todo_TITLE:string = "";

    private list_ID:number;
    private list_TODOS = [];
    private list_NAME:string;
    private list_COLOR:number = 0;

    constructor(private _ngZone:NgZone, public sidenav:SidenavService) {
    }

    ngOnInit() {
        this.hoodie.store.on("add", (newTodoObject:any) => {
            this._ngZone.runOutsideAngular(()=> {
                this.list_TODOS.unshift(newTodoObject);
                this._ngZone.run(() => {
                });
            });
        });

        this.hoodie.store.on("remove", (delTodoObject:any) => {
            this._ngZone.runOutsideAngular(()=> {
                for (var x in this.list_TODOS) {
                    if (this.list_TODOS[x].list_ID === delTodoObject.list_ID) {
                        this.list_TODOS.splice(x, 1);
                    }
                }
                this._ngZone.run(() => {
                });
            });

        });
    }

    ngOnChanges() {
        //get Todos
        this.hoodie.store.findAll(this.list_NAME)
            .done((allTodos) => {
                this._ngZone.runOutsideAngular(()=> {
                    this.list_TODOS = allTodos;
                    this._ngZone.run(() => {
                    });
                });
            });
        //get ListColor
        this.hoodie.store.find("listnames", this.list_ID).done((r)=> {
            this._ngZone.runOutsideAngular(()=> {
                if (!r.color) {
                    this.list_COLOR = 0;
                } else {
                    this.list_COLOR = r.color;
                }
                if (cordova.platformId == 'android') {
                    StatusBar.backgroundColorByHexString(COLORS[this.list_COLOR].secondaryColor);
                }
                this._ngZone.run(() => {
                });
            });
        });
    }

    backgroundColor() {
        return COLORS[this.list_COLOR].backgroundcolor;
    }

    Color() {
        return COLORS[this.list_COLOR].color;
    }

    changeColor() {
        this.list_COLOR++;
        if (this.list_COLOR >= 20) {
            this.list_COLOR = 0;
        }
        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString(COLORS[this.list_COLOR].secondaryColor);
        }
        this.hoodie.store.update("listnames", this.list_ID, {color: this.list_COLOR});

    }

    addtodo() {

        this.hoodie.store.add(this.list_NAME, {title: this.todo_TITLE, checked: false});
    }

    deleteItem(id:number) {
        this.hoodie.store.remove(this.list_NAME, id);
    }

    deleteList() {
        this.hoodie.store.removeAll(this.list_NAME);
        this.hoodie.store.remove("listnames", this.list_ID);
    }

    updateItem(id:number, state:boolean) {
        this.hoodie.store.update(this.list_NAME, id, {checked: state});
    }

    openNav(name:string) {
        this.sidenav.show(name);
    }

    isMobile():boolean {
        return (Media.hasMedia("xs") || Media.hasMedia("sm"));
    }
}

