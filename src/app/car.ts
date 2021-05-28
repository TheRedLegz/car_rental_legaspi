export class Car {
    key: string;
    carName: string;
    carImage: string;
    rentPrice: number;
    isAvailable: boolean = true;
    starRating: number = 0;

    constructor(key: string, carName: string, carImage: string, rentPrice: number, isAvailable : boolean, starRating: number) {
        this.key = key;
        this.carName = carName;
        this.carImage = carImage;
        this.rentPrice = rentPrice;
        this.isAvailable = isAvailable;
        this.starRating = starRating;
    }

    toMap() : Object {
        return {
            key : this.key,
            carName : this.carName,
            carImage : this.carImage,
            rentPrice : this.rentPrice,
            isAvailable : this.isAvailable,
            starRating : this.starRating,
        }
    }
}