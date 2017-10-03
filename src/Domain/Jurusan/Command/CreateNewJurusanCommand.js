import {Jurusan} from "../Model/Jurusan";
import {InvalidException} from "../Exception/InvalidException";

export class CreateNewJurusanCommand {
    constructor(jurusan) {
        if (jurusan instanceof Jurusan) {
            this.jurusan = jurusan;
        } else {
            throw new InvalidException('jurusan must be instanceof Jurusan class!');
        }
    }
}