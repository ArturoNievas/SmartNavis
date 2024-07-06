package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.model.Usuario;

public interface PermutaService extends SmartNavisService<Permuta, Long> {
    Permuta aceptar(Permuta permuta, Usuario usuario);

    Permuta crear(Publicacion solicitada, Publicacion ofertada);

    Iterable<Permuta> listarSolicitudes(Publicacion publicacion);

	Permuta registrar(Permuta permuta);
}
