

export class Usuario {

    constructor(nome?: string, email?: string, cpf?: string, dtnasc?: Date, avatar?: any) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.dtnasc = dtnasc;
        this.avatar = avatar;
      };


    id: number;
    nome: string;
    cpf: string;
    email: string;
    dtnasc: Date;
    ativo: any;
    avatar: File;
    
}