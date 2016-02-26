/**
 * Created by simon on 16.02.16.
 */

declare var Hoodie:any;
declare var hello:any;


export class HoodieService {

    public hoodie:any = new Hoodie("http://192.168.1.165:9999");
    public hello:any = new hello();

    constructor() {
        this.hello.init({

            google: "454280357802-fl53288ksphhfdj6rv0l2ubob61285d1.apps.googleusercontent.com",
            facebook: "232692377068146"
        }, {redirect_uri: "/"});


    }
}
