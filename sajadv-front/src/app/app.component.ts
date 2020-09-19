import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioform = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      dtnasc: ['']
    });
    
  }

  public onSubmit(): void{

    this.usuario.ativo = true;
    this.usuarioService.salvarUsuario(this.usuario).subscribe(f => {

      console.warn(f);
    });
  }
}
