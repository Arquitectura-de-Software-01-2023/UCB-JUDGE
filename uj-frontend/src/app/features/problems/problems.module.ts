import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailsComponent } from './components/problem-details/problem-details.component';
import { ProblemSubmitComponent } from './components/problem-submit/problem-submit.component';
import { ProblemResultsComponent } from './components/problem-results/problem-results.component';
import { ProblemSubmittedListComponent } from './components/problem-submitted-list/problem-submitted-list.component';
import { SharedModule } from "../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {CodeEditorModule } from '@ngstack/code-editor';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
    declarations: [
        ProblemListComponent,
        ProblemDetailsComponent,
        ProblemSubmitComponent,
        ProblemResultsComponent,
        ProblemSubmittedListComponent
    ],
    exports: [
        ProblemListComponent
    ],
    imports: [
        CommonModule,
        ProblemsRoutingModule,
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatChipsModule,
        CodeEditorModule.forRoot(),
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTooltipModule
    ]
})
export class ProblemsModule { }
