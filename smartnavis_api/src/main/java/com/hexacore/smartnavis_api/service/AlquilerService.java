package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.model.Alquiler;

public interface AlquilerService extends SmartNavisService<Alquiler, Long> {

	Alquiler alquilarTitular(Long id, CrearEmbarcacionInput embarcacion, Long titularId);

}
