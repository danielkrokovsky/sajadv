package com.example.demo.usuario.model;

import java.io.Serializable;
import java.text.ParseException;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Transient;
import javax.swing.text.MaskFormatter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Where;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Entity
@Where(clause = "ativo = true")
@Data
public class Usuario implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotBlank(message = "Nome não pode ser nulo")
	@Size(max = 150, message = "Nome não pode ter mais que 150 caracteres")
	private String nome;

	@NotBlank(message = "Cpf não pode ser nulo")
	@Column(name="cpf", unique=true)
	private String cpf;

	@DateTimeFormat(pattern = "dd.MM.yyyy")
	private LocalDate dtnasc;
	
	@Email
	@NotBlank(message = "E-mail não pode ser nulo")
	@Size(max = 400, message = "E-mail não pode ter mais que 400 caracteres")
	private String email;
	
	private Boolean ativo;
	@Lob
	private byte[] avatar;

	@Transient
	private String cpfFormatado;

	public String getCpfFormatado() {

		return this.formatarCpf(this.cpf);
	}

	private String formatarCpf(String cpf) {

		try {
			MaskFormatter mf = new MaskFormatter("###.###.###-##");
			mf.setValueContainsLiteralCharacters(false);
			return mf.valueToString(this.cpf);
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return cpf;

	}
}
