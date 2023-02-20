import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacypolicyComponent } from './privacypolicy.component';
import { RouterModule, Routes } from '@angular/router';
const PRIVACYPOLICY_ROUTE: Routes = [{
    path: '', component: PrivacypolicyComponent
}]

@NgModule({
    declarations: [
        PrivacypolicyComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(PRIVACYPOLICY_ROUTE)

    ]
})
export class privacyModule { }
