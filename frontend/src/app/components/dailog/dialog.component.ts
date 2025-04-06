import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TrackAdvice } from '../../services/spotify.service';

@Component({
    standalone: true,
    selector: 'app-dialog',
    imports: [CommonModule, MatDialogModule],
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: TrackAdvice) {}
}
