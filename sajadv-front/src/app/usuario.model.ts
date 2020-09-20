

export class Usuario {

    constructor(nome: string, email: string, cpf: string, dtnasc: Date) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.dtnasc = dtnasc;
      }

    id: number;
    nome: string;
    cpf: string;
    email: string;
    dtnasc:Date;
    ativo: boolean;
    
}