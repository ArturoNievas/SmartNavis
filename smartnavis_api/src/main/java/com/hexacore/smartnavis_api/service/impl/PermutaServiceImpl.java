package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.AlquilerRepository;
import com.hexacore.smartnavis_api.repository.EmbarcacionRepository;
import com.hexacore.smartnavis_api.repository.PermutaRepository;
import com.hexacore.smartnavis_api.service.PermutaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Stream;

@Service
@Transactional
public class PermutaServiceImpl extends SmartNavisServiceImpl<Permuta, Long> implements PermutaService {
    private final PermutaRepository repository;
    private final AlquilerRepository alquilerRepository;
    private final EmbarcacionRepository embarcacionRepository;

    public PermutaServiceImpl(PermutaRepository repository, AlquilerRepository alquilerRepository, EmbarcacionRepository embarcacionRepository) {
        super(repository);
        this.repository = repository;
        this.alquilerRepository = alquilerRepository;
        this.embarcacionRepository = embarcacionRepository;
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
        if (solicitada.equals(ofertada)) {
            throw new BadRequestException("El bien solicitado no puede ser igual al ofertado.");
        }
        if (solicitada.getBien().getTitular().equals(ofertada.getBien().getTitular())) {
            throw new BadRequestException("El bien solicitado no puede ser del mismo titular.");
        }
        Optional<Permuta> permutaOptional = this.repository.findBySolicitadaAndOfertada(solicitada, ofertada);
        if (permutaOptional.isPresent()) {
            throw new BadRequestException("El bien seleccionado ya fue ofertado para esta publicación.");
        }
        if (this.alquilerRepository.findByEmbarcacionIn(this.embarcacionRepository
                .findAllById(Stream.of(solicitada, ofertada)
                        .mapToLong(publicacion -> publicacion.getBien().getId()).boxed().toList())).isEmpty()) {
            throw new BadRequestException("Al menos uno de los bienes a permutar debe ser una embarcación amarrada en puerto.");
        }
        return this.repository.save(new Permuta(solicitada, ofertada));
    }

    @Override
    public Iterable<Permuta> listarSolicitudes(Publicacion publicacion) {
        return this.repository.findBySolicitada(publicacion);
    }

	@Override
	public Permuta registrar(Permuta permuta) {
		
		if (permuta.isRegistrada()) {
			throw new BadRequestException("La permuta seleccionada ya se encuentra registrada.");
		}
		
		permuta.usuariosHabilitados();
		permuta.bienesHabilitados();
		
		permuta.setPendiente(false);
		permuta.setFinalizada(true);
		permuta.setRegistrada(true);
		
		this.patch(permuta.getId(),  entity -> this.updateMapper(entity, permuta));
		
		return permuta;
	}

	private Permuta updateMapper(Permuta entity, Permuta permuta) {
		return permuta;
	}
}
