package com.example.demo.usuario.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.usuario.model.Usuario;
import com.example.demo.usuario.service.UsuarioService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	
	@PostMapping
	public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
		
		Usuario user = this.usuarioService.save(usuario);

		return ResponseEntity.created(URI.create("/usuario/" + user.getId())).body(user);
	}

	@GetMapping
	public ResponseEntity<Iterable<Usuario>> getAll() {
		
		Iterable<Usuario> user = this.usuarioService.getAll();

		return ResponseEntity.ok(user);
	}
}
