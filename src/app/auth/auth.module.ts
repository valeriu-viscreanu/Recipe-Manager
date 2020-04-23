import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
       AuthComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule 
    ],
    exports: [
        AuthComponent
    ]

})
export class AuthModule{

}