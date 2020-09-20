import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { utils } from 'protractor';
import { Utils } from './shared/utils';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sajadv-front';

  usuarioform: FormGroup;
  listUsuario: Array<Usuario>;


  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.criarFormularioDeUsuario();
    this.activatedRoute.data.subscribe(data => {
      this.carregarGrid();
    });
  }

  criarFormularioDeUsuario() {
    this.usuarioform = this.fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.maxLength(150), Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.maxLength(400)])],
      dtnasc: ['', Validators.compose([Validators.required])]
    });
  }


  public enviarDados(): void {

    const dadosFormulario = this.usuarioform.value;
    const usuario = new Usuario(
      dadosFormulario.nome,
      dadosFormulario.email,
      Utils.getCpf(dadosFormulario.cpf),
      dadosFormulario.dtnasc
    );

    //nome: string, email: string, cpf: string, dtnasc: Date

    this.usuarioService.salvarUsuario(usuario).subscribe(f => {

      this.toastr.success("Usuário Salvo com sucesso", "Usuário");
      this.usuarioform.reset();
      this.carregarGrid();
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
