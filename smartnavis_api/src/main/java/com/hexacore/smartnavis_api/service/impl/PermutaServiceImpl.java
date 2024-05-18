package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.PermutaRepository;
import com.hexacore.smartnavis_api.service.PermutaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PermutaServiceImpl extends SmartNavisServiceImpl<Permuta, Long> implements PermutaService {
    public PermutaServiceImpl(PermutaRepository repository) {
        super(repository);
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El intercambio no existe.");
    }

    @Override
    public Permuta aceptar(Permuta permuta) {
        if (permuta.isAceptada()) {
            throw new BadRequestException("El intercambio ya ha sido aceptado.");
        }
        if (permuta.isFinalizada()) {
            throw new BadRequestException("No es posible aceptar un intercambio finalizado.");
        }
        if (!permuta.isPendiente()) {
            throw new BadRequestException("No es posible aceptar un intercambio no pendiente.");
        }
        if (permuta.isRegistrada()) {
            throw new BadRequestException("No es posible aceptar un intercambio registrado.");
        }

        // Marco la permuta como aceptada y ya no está pendiente.
        permuta.setAceptada(true);
        permuta.setPendiente(false);

        // FIXME: consultar si se deben marcar todas las otras solicitudes del mismo bien como rechazadas.

        return this.persist(permuta);
    }

	@Override
	public Permuta crear(Publicacion solicitada, Publicacion ofertada) {
		Permuta p = new Permuta(solicitada, ofertada);
		if (p.getSolicitada().getPermutasSolicitadas().contains(p)) {
			throw new BadRequestException("El bien seleccionado ya fue ofertado para esta publicación.");
		}
		return this.repository.save(p);
	}
}
