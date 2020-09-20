import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Utils } from './shared/utils';
import { Validacoes } from './shared/validacoes';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

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

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.usuario = new Usuario(
      null,
      null,
      null,
      null,
      null
    );

    this.criarFormularioDeUsuario();
    this.activatedRoute.data.subscribe(data => {
      this.carregarGrid();
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

    const dadosFormulario = this.usuarioform.value;
    
    this.usuarioService.salvarUsuario(this.usuario).subscribe(f => {

      this.toastr.success("Usuário Salvo com sucesso", "Usuário");
      this.usuarioform.reset();
      this.carregarGrid();
      this.usuario = new Usuario(null,null,null,null,null);
    });

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.nomeArquivo = event.target.files[0].name;
      this.avatar = event.target.files[0]
    }
  }

  public editarUsuario(usuario: any):void{
    this.usuario = usuario;
  }

  public excluirUsuario(usuario: any):void{
    this.usuario = usuario;
    this.usuario.ativo = false

    this.usuarioService.excluirUsuario(this.usuario).subscribe(f => {

      this.toastr.success("Usuário atualizado com sucesso", "Usuário");
      this.usuarioform.reset();
      this.carregarGrid();
      this.usuario = new Usuario(null,null,null,null,null);
    });

  }


  private carregarGrid(): void {
    this.usuarioService.getUsuario().subscribe((user: any) => {
      this.listUsuario = user
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
