package com.example.demo.usuario.service;


import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.stereotype.Service;

import com.example.demo.usuario.model.Usuario;
import com.example.demo.usuario.repository.UsuarioRepository;
import com.querydsl.core.types.Predicate;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	public Usuario save(Usuario usuario) {

		return usuarioRepository.save(usuario);
	}
	
	public Page<Usuario> getAll(Pageable page) {

		return usuarioRepository.findAll(page);
	}
	
	
	public Page<Usuario> getUsuarioFilter(@QuerydslPredicate(root = Usuario.class) Predicate predicate, Pageable page) {
		
		Page<Usuario> iterable  = usuarioRepository.findAll(predicate, page);
		
		return iterable;
	}

}
