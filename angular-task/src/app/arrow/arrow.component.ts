import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ArrowComponent {
  @Input() direction: 'asc' | 'desc' | null = null;
}
