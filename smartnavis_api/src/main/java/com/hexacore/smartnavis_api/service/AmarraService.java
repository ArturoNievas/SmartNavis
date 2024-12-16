package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.controller.input.ReAsignarAmarraTerceroInput;
import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Puerto;

public interface AmarraService extends SmartNavisService<Amarra, Long> {
	
	Iterable<Amarra> listarAmarras(Puerto puerto);

	Iterable<Amarra> listarAmarrasDisponibles(Puerto puerto, Double eslora, Double manga, Double calado);
	
	Amarra toggleDisponible(Amarra amarra);

	Alquiler liberarAmarra(Amarra amarra);

	Alquiler reAsignarAmarraTitular(Amarra amarra, Long nuevoTitularID);

	Alquiler reAsignarAmarraTercero(Amarra amarra, ReAsignarAmarraTerceroInput nuevoTitular);

}
