import { HttpParams } from '@angular/common/http';


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

export const removerCamposVaziosDoRequest = (request: any): any => {
    for (const property in request) {
      if (request[property] === '' || request[property] === undefined || request[property] === null) {
        delete request[property];
      } else {
        const aux = request[property];
        if (aux && aux.length === 0) {
          delete request[property];
        }
      }
    }
  
    return request;
  };

  export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
  
    if (req) {
      Object.keys(req).forEach(key => {
          options = options.set(key, req[key]);
      });
    }
  
    return options;
  };