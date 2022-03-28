import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { Matter } from '@app/core/interfaces/matter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-intake-main',
  templateUrl: './intake-main.component.html',
  styleUrls: ['./intake-main.component.scss']
})
export class IntakeMainComponent implements OnInit, OnDestroy {

  matters$ : Observable<Matter[]>

 // these properties will manage the state of this component
 // the main table only displays when an intake is not in progress
 // we can call the the overview table or the main selection container
 displaySelectionTable : boolean = true;


 // this is the selected matter that will be fed to the child intake components
 selectedMatter : Matter;

  constructor(
    private clientMatterService : ClientMatterService
  ) {

      this.matters$ = this.clientMatterService.entities$;
   }

  ngOnInit(): void {
  }



  ngOnDestroy(): void {
    
  }

  selectMatter(matter : Matter) : void {
    //toggle the visiblity of the selection table
    this.displaySelectionTable = false;

    this.selectedMatter = matter;
  }
  
}
