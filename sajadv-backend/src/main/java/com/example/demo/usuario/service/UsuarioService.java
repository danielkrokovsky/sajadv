package com.example.demo.usuario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.usuario.model.Usuario;
import com.example.demo.usuario.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	public Usuario save(Usuario usuario) {

		return usuarioRepository.save(usuario);
	}
	
	public Iterable<Usuario> getAll() {

		return usuarioRepository.findAll();
	}

}
