import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sajadv-front';

  usuarioform : FormGroup;
  usuario: Usuario = new Usuario();
  listUsuario: Array<Usuario>;


  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.usuarioform = this.fb.group({
      nome: [''],
      cpf: new FormControl('', Validators.minLength(5)),
      email: [''],
      dtnasc: ['']
    });

    this.activatedRoute.data.subscribe(data => {
      this.carregarGrid();
    });

    
  }

  public onSubmit(): void{

    this.usuario.ativo = true;
    this.usuarioService.salvarUsuario(this.usuario).subscribe(f => {

      this.toastr.success("Usuário Salvo com sucesso", "Usuário");
      this.usuarioform.reset();
      this.carregarGrid();
    });
  }

  private carregarGrid(): void{
    this.usuarioService.getUsuario().subscribe((user: any) => {
      this.listUsuario = user
    });
  }
}
