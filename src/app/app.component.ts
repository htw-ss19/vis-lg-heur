import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog, MatSidenav} from '@angular/material';
import {AboutThisAppComponent} from './components/dialogs/about-this-app/about-this-app.component';
import {HeuristicsSelectionComponent} from './components/dialogs/heuristics-selection/heuristics-selection.component';
import {CalculationService} from './services/calculation.service';
import {PopUpComponent} from './components/dialogs/pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('snav', {static: false}) private snav: MatSidenav;
  mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher,
              private changeDetector: ChangeDetectorRef,
              private dialog: MatDialog,
              public calculation: CalculationService) {
    // See Bootstrap resizing
    this.mobileQuery = media.matchMedia('(max-width: 576px)');
  }

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

  openHeuristicsList(): void {
    const possiblyExactSolvableMessage = this.calculation.getMessageIfExactlySolvableProblem();
    if (possiblyExactSolvableMessage) {
      this.dialog.open(PopUpComponent, {data: possiblyExactSolvableMessage});
    } else {
      this.dialog.open(HeuristicsSelectionComponent);
    }
  }

  openInfoDialog(): void {
    this.dialog.open(AboutThisAppComponent);
  }

  // TODO: Extract to info pop up?
  openGithubPage(): void {
    window.open('https://github.com/lucaslar/vis-lg-heur');
  }

  onListItemTapped(): void {
    if (this.snav.mode === 'over') {
      this.snav.close().then();
    }
  }
}
