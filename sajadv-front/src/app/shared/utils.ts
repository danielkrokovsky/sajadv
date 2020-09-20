

export class Utils {

    public static getCpf(value: any): string {

        if(value !== undefined && value !== null){
        if (value.toString().length === 11) {
            return value;
        }
        if (value.toString().length === 10) {
            return "0" + value;
        }
        if (value.toString().length === 14) {
            return value.split('.').join('').replace('-', '');
        }
    }

        return '';
    }
}