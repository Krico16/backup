import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rating: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }

    switch (this.rating) {
      case 1:
      case 2:
        return COLORS.RED;
        break;
      case 3:
        return COLORS.YELLOW;
        break;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
        break;
    }
  }

  isAboveRating(index: number) {
    return index > this.rating;
  }
}

enum COLORS {
  GREY = '#adadad',
  GREEN = '#66ff66',
  YELLOW = '#d9e368',
  RED = '#ff5252'
}
