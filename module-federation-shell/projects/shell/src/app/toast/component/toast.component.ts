import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastService } from '../toast.service';
import { Toast } from '../model/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('overlayAnimation', [
      state('void', style({
        transform: 'translateY(5%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => visible', animate('225ms ease-out')),
      transition('visible => void', animate('195ms ease-in'))
    ])
  ]
})
export class ToastComponent implements OnInit {

  @Input() timeout: number;
  @Input() orientation: string = this.toastService.TOAST_CONSTANTS.ORIENTATION_TOP_RIGHT;
  @Input() block: boolean = false;

  constructor(public readonly toastService: ToastService) { }

  ngOnInit() {
    if (this.timeout) {
      this.toastService.timeout = this.timeout;
    }
  }

  closeToast(toast: Toast) {
    this.toastService.closeToast(toast);
  }

}
