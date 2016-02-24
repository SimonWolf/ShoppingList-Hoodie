import { Pipe, PipeTransform } from "angular2/core";

@Pipe({
    name: "sortList"
})
export class SortListPipe {
    transform(array:Array<string>, args:string):Array<string> {
        array.sort((a:any, b:any) => {
            if (a.checked < b.checked) {
                return -1;
            } else if (a.checked > b.checked) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}