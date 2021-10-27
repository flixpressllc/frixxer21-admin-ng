import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { faForward, faFastForward, faBackward, faFastBackward  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input() currentPage: number;
  @Input() pageSize: number;
  @Input() numPages: number;
  @Input() totalRecordsCount: number;
  @Input() esoc: number;
  @Output() pageChanged = new EventEmitter<number>();

  pages: Array<number>;
  lBound: number;
  uBound: number;
  lBoundResult: number;
  uBoundResult: number;

  showStartEllipses: boolean;
  showEndEllipses: boolean;

  hasPrevious: boolean;
  hasNext: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;

  faForward = faForward;
  faFastForward = faFastForward;
  faBackward = faBackward;
  faFastBackward = faFastBackward;

  constructor() {
  }

  private _calculatePageMetrics(): void {

    this.lBound = Math.max(1, this.currentPage - this.esoc);
    this.uBound = Math.min(this.numPages, this.currentPage - -1 * this.esoc);

    this.lBoundResult = Math.max(1, (this.currentPage - 1) * this.pageSize + 1);
    this.uBoundResult = Math.min(this.totalRecordsCount, (this.currentPage * this.pageSize));

    this.pages = new Array<number>();

    for (let i = this.lBound; i <= this.uBound; i++) {
      this.pages.push(i);
    }

    this.hasPrevious = this.currentPage > 1;
    this.hasNext = this.currentPage < this.numPages;
    this.isFirstPage = this.currentPage === 1;
    this.isLastPage = this.currentPage === this.numPages;
  }

  ngOnChanges(): void {
    if (this.esoc == null) {
      this.esoc = 1;
    }

    this._calculatePageMetrics();
  }

  public setCurrentPage = (newCurrentPage: number) => {
    if (newCurrentPage >= 1 && newCurrentPage <= this.numPages) {
      this.currentPage = newCurrentPage || 1;

      this.pageChanged.emit(this.currentPage);
    }

    this._calculatePageMetrics();
  }

  goToPreviousPage = () => {
    this.setCurrentPage(this.currentPage - 1);
  }

  goToNextPage = () => {
    this.setCurrentPage(this.currentPage + 1);
  }

  goToFirstPage = () => {
    this.setCurrentPage(1);
  }

  goToLastPage = () => {
    this.setCurrentPage(this.numPages);
  }
}
