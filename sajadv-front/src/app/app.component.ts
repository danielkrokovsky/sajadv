import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { removerCamposVaziosDoRequest, Utils } from './shared/utils';
import { Validacoes } from './shared/validacoes';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import * as moment from 'moment';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuarioform: FormGroup;
  listUsuario: Array<Usuario>;
  nomeArquivo: any = new String('Selcione uma foto');
  avatar: any;
  usuario : Usuario;
  page : any;

  totalItems = 0;
  itemsPerPage = 5
  first = 0;
  pageNumber = 0;
  pageSize = 0;
  pageNumberArray = [];
  errors = [];

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.usuario = new Usuario();

    this.criarFormularioDeUsuario();
    this.activatedRoute.data.subscribe(data => {
      this.carregarGrid();
    });
  }

  public carregarGrid(pagina?: any): void {

    this.usuarioService.getUsuario({ page: pagina, size: this.itemsPerPage, sort : 'nome' }).subscribe((user: any) => {
      this.listUsuario = user.body.content;
      this.totalItems = Math.ceil(user.body.totalElements / this.itemsPerPage);
      this.pageNumberArray = Array(this.totalItems).map((x,i)=>i);
    });
  }

  criarFormularioDeUsuario() {
    this.usuarioform = this.fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.maxLength(150), Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validacoes.ValidaCpf])],
      email: ['', Validators.compose([Validators.email, Validators.maxLength(400)])],
      dtnasc: ['', Validators.compose([Validators.required])],
      avatar: ['']
    });
  }


  public enviarDados(): void {
    
    this.usuarioService.salvarUsuario(this.usuario).subscribe(f => {

      this.toastr.success("Usuário Salvo com sucesso", "Usuário");
      this.usuarioform.reset();
      this.carregarGrid();
      this.usuario = new Usuario();
      this.errors = [];
    }, (error) =>{
      this.errors = error.error;
      this.toastr.error("Error ao cadastrar usuário", "Usuário");
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.nomeArquivo = event.target.files[0].name;
      this.avatar = event.target.files[0]
    }
  }

  public limpar(): void{

    this.usuarioform.reset();
    this.carregarGrid();
    this.errors = [];
  }

  public editarUsuario(usuario: any):void{
    this.usuario = usuario;
  }

  public excluirUsuario(usuario: any):void{
    this.usuario = usuario;
    this.usuario.ativo = false

    this.usuarioService.excluirUsuario(this.usuario).subscribe(f => {

      this.toastr.success("Usuário excluido com sucesso", "Usuário");
      this.usuarioform.reset();
      this.carregarGrid();
      this.usuario = new Usuario();
    }, (error) =>{
      this.toastr.error("Error ao excluir usuário", "Usuário");
    });
  }

  public pesquisar(): void{

    const date = (this.dtnasc.value != null && this.dtnasc.value !== undefined) ? moment(this.dtnasc.value) : null 

    const request = {
    "nome" : this.nome.value,
    "cpf" : (this.cpf.value !== null && this.cpf.value !== undefined) ?  this.cpf.value.split('.').join('').replace('-', '') : null,
    "email" : this.email.value,
    "dtnasc" : (date != null && date !== undefined) ? date.format('DD.MM.yyyy') : null
    
  }
    
    let req = removerCamposVaziosDoRequest(request);
    this.usuarioService.queryUsuario(req).subscribe(f => {

      this.listUsuario = [];
      this.listUsuario = f.body.content;

      if(this.listUsuario === null || this.listUsuario === undefined || this.listUsuario.length === 0){
        this.toastr.error("nenhum Usuário encontrado", "Usuário");
      }
    });
  }

  get nome() {
    return this.usuarioform.get('nome');
  }

  get cpf() {
    return this.usuarioform.get('cpf');
  }

  get email() {
    return this.usuarioform.get('email');
  }

  get dtnasc() {
    return this.usuarioform.get('dtnasc');
  }
  
}
