export class Car {
    key: string;
    carName: string;
    carImage: string;
    rentPrice: number;

    constructor(key: string, carName: string, carImage: string, rentPrice: number) {
        this.key = key;
        this.carName = carName;
        this.carImage = carImage;
        this.rentPrice = rentPrice;
    }
}