import {AppComponent} from "./app.component";
import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";


import {enableProdMode, provide} from "angular2/core";
import {FORM_PROVIDERS} from "angular2/common";

import {HoodieService} from "./services/hoodie.service"
import {HTTP_PROVIDERS} from "angular2/http";





//enableProdMode();

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    HoodieService,
    MATERIAL_DIRECTIVES,
    MATERIAL_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),

]);
