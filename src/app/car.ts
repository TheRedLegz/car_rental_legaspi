export class Car {
    key: string;
    carName: string;
    carImage: string;
    rentPrice: number;
    isAvailable: boolean = true;

    constructor(key: string, carName: string, carImage: string, rentPrice: number) {
        this.key = key;
        this.carName = carName;
        this.carImage = carImage;
        this.rentPrice = rentPrice;
    }

    toMap() : Object {
        return {
            key : this.key,
            carName : this.carName,
            carImage : this.carImage,
            rentPrice : this.rentPrice,
            isAvailable : this.isAvailable,
        }
    }
}