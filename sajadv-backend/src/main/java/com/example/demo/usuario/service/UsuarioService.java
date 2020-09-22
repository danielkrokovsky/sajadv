package com.example.demo.usuario.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.stereotype.Service;

import com.example.demo.usuario.exception.CpfCadastroException;
import com.example.demo.usuario.model.Usuario;
import com.example.demo.usuario.repository.UsuarioRepository;
import com.querydsl.core.types.Predicate;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	public Usuario save(Usuario usuario) {

		if (usuario.getId() == null) {

			Optional<Usuario> findByCpf = this.usuarioRepository.findByCpf(cpfSemFormatacao(usuario.getCpf()));

			if (!findByCpf.isEmpty()) {
				throw new CpfCadastroException("Cpf já cadastrado na base");
			}
		}

		return usuarioRepository.save(usuario);
	}

	public Page<Usuario> getAll(Pageable page) {

		return usuarioRepository.findAll(page);
	}

	public Page<Usuario> getUsuarioFilter(@QuerydslPredicate(root = Usuario.class) Predicate predicate, Pageable page) {

		Page<Usuario> iterable = usuarioRepository.findAll(predicate, page);

		return iterable;
	}

	private String cpfSemFormatacao(String cpf) {

		if (cpf != null) {
			return cpf.replace(".", "").replace("-", "");
		}

		return "";
	}

}
