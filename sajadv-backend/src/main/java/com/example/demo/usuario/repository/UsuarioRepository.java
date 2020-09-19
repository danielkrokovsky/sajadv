package com.example.demo.usuario.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.usuario.model.Usuario;

public interface UsuarioRepository  extends PagingAndSortingRepository<Usuario, Long>{

}
