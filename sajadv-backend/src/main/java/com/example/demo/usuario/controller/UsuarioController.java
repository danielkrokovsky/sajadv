package com.example.demo.usuario.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.usuario.model.Usuario;
import com.example.demo.usuario.service.UsuarioService;
import com.querydsl.core.types.Predicate;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	
	@PostMapping
	public ResponseEntity<Usuario> create(@Valid @RequestBody Usuario usuario) {
		
		usuario.setAtivo(true);
		Usuario user = this.usuarioService.save(usuario);

		return ResponseEntity.created(URI.create("/usuario/" +user.getId())).body(user);
	}
	
	@PutMapping
	public ResponseEntity<Usuario> update(@RequestBody Usuario usuario) {
		
		Usuario user = this.usuarioService.save(usuario);

		return ResponseEntity.created(URI.create("/usuario/" +user.getId())).body(user);
	}

	@GetMapping
	public ResponseEntity<Page<Usuario>> getAll(Pageable page) {
		
		Page<Usuario> user = this.usuarioService.getAll(page);

		return ResponseEntity.ok(user);
	}
	
	@GetMapping(path = "/flter")
	public ResponseEntity<Page<Usuario>> getAllFilter(@QuerydslPredicate(root = Usuario.class) Predicate predicate, Pageable page) {
		
		
		Page<Usuario> user = this.usuarioService.getUsuarioFilter(predicate, page);

		return ResponseEntity.ok(user);
	}
}
