package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.controller.input.CrearPersonaInput;
import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.AlquilerTercero;

public interface AlquilerTerceroService extends SmartNavisService<AlquilerTercero, Long> {

	Alquiler alquilarTercero(Long id, CrearEmbarcacionInput embarcacion, Long titularId, CrearPersonaInput duenio, String parentezco);
}
