import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ModalService, ModalState } from '../../services/modal.service';
import { ChannelTypeEnum } from '../../enums/channel-type.enum';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html'
})
export class ModalGenericComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef') public inputRef!: ElementRef<HTMLInputElement>;
  public isOpen$: Observable<boolean> = this._modalService.isOpen$;
  public state$: Observable<ModalState | undefined> = this._modalService.state$;
  public channelType: ChannelTypeEnum = ChannelTypeEnum.audio;
  public selectedChannelType = '';

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _modalService: ModalService) {}

  public ngOnInit(): void {
    this._isOpenListener();
    this.state$.pipe(takeUntil(this._destroy$)).subscribe({
      next: state => {
        // Channel modal flow
        if (state?.data?.channelType) {
          this.channelType = state?.data.channelType;
          this.selectedChannelType = this.channelType;
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _isOpenListener(): void {
    this.isOpen$
      .pipe(
        filter((isOpen: boolean) => isOpen),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.inputRef?.nativeElement?.focus();
          });
        }
      });
  }

  public close(): void {
    this._modalService.reset();
  }

  public save(state: ModalState): void {
    state.save ? state.save(state.textInput, this.channelType) : undefined;
    this._modalService.reset();
  }

  public delete(state: ModalState): void {
    state.delete ? state.delete() : undefined;
    this._modalService.reset();
  }

  public create(state: ModalState): void {
    if (!state.create) return;
    state.create(state.textInput, this.channelType);
    this._modalService.reset();
  }

  public selectText(): void {
    this.channelType = ChannelTypeEnum.text;
  }

  public selectAudio(): void {
    this.channelType = ChannelTypeEnum.audio;
  }
}
