import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {LogEventType} from '../../../model/enums/LogEventType';
import {SchedulingLogEntry} from '../../../model/internal/visualization/SchedulingResult';

@Component({
  selector: 'app-scheduling-log-dialog',
  templateUrl: './scheduling-log-dialog.component.html',
  styleUrls: ['./scheduling-log-dialog.component.css', '../shared-dialog-styles.css']
})
export class SchedulingLogDialogComponent {

  private _logEventType = LogEventType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SchedulingLogEntry[]) {
  }

  get logEventType(): any {
    return this._logEventType;
  }
}
