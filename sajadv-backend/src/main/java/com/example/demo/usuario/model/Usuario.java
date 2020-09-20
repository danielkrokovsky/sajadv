package com.example.demo.usuario.model;

import java.io.Serializable;
import java.text.ParseException;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Transient;
import javax.swing.text.MaskFormatter;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Entity
@Data
public class Usuario implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nome;

	private String cpf;

	@DateTimeFormat(pattern = "dd.MM.yyyy")
	private LocalDate dtnasc;
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
