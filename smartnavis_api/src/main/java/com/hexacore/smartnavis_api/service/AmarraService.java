package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Puerto;

public interface AmarraService extends SmartNavisService<Amarra, Long> {
	
	Iterable<Amarra> listarAmarras(Puerto puerto);

	Iterable<Amarra> listarAmarrasDisponibles(Puerto puerto, double eslora, double manga, double calado);
}
