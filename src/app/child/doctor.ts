export class Rating {
  constructor(private rates: number[]) {}
  numOfRates(): number {
    return this.rates.length;
  }
  avgRatings(): number {
    let avg = this.rates.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
    return avg / this.rates.length;
  }
  Rate(): any {
    if (this.avgRatings() <= 5 && this.avgRatings() >= 4) {
      return '⭐⭐⭐⭐⭐';
    } else if (this.avgRatings() < 4 && this.avgRatings() >= 3) {
      return '⭐⭐⭐⭐';
    } else if (this.avgRatings() < 3 && this.avgRatings() >= 2) {
      return '⭐⭐⭐';
    } else if (this.avgRatings() < 2 && this.avgRatings() >= 1) {
      return '⭐⭐';
    } else {
      return '⭐';
    }
  }
}
export class Doctor {
  constructor(
    public name: string = 'Not found',
    public special:
      | 'Skin'
      | 'Teeth'
      | 'Child'
      | 'Mental'
      | 'Bones'
      | 'Ear & Nose'
      | 'Brain & Nerves',
    public rating: Rating,
    public place: string = 'Not found',
    public fees: string = 'Not found',
    public phoneNumber: string = 'Not found',
    public duration: number = 0,
    public img: string = 'Not found',
    public availableTime: number[] //24 hours system
  ) {}
}
