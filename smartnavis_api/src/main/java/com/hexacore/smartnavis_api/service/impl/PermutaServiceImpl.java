package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.repository.*;
import com.hexacore.smartnavis_api.service.PermutaService;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Stream;

@Service
@Transactional
public class PermutaServiceImpl extends SmartNavisServiceImpl<Permuta, Long> implements PermutaService {
    private final PermutaRepository permutaRepository;
    private final AlquilerRepository alquilerRepository;
    private final EmbarcacionRepository embarcacionRepository;
    private final AdministradorRepository administradorRepository;

    public PermutaServiceImpl(PermutaRepository permutaRepository, AlquilerRepository alquilerRepository,
                              EmbarcacionRepository embarcacionRepository, AdministradorRepository administradorRepository) {
        super(permutaRepository);
        this.permutaRepository = permutaRepository;
        this.alquilerRepository = alquilerRepository;
        this.embarcacionRepository = embarcacionRepository;
        this.administradorRepository = administradorRepository;
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El intercambio no existe.");
    }

    @Override
    public Permuta aceptar(Permuta permuta, Usuario usuario) {
        Optional<Administrador> adminOp = this.administradorRepository.findByUsername(usuario.getUsername());
        if (adminOp.isEmpty() && (usuario.getDni() != permuta.getSolicitada().getBien().getTitular().getDni())) {
            throw new BadRequestException("El usuario no es titular del bien publicado.");
        }
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

        // Marco la permuta aceptada y rechazo todas las demás.
        this.permutaRepository.findBySolicitada(permuta.getSolicitada()).forEach(p -> {
            p.setAceptada(p.getId().equals(permuta.getId()));
            p.setPendiente(false);
            this.permutaRepository.save(p);
        });

        // Marco como finalizada las permutas del bien ofertado.
        // TODO: descomentar en caso de ser necesario la regla.
//        this.permutaRepository.findByOfertada(permuta.getOfertada()).forEach(p -> {
//            p.setFinalizada(!p.getId().equals(permuta.getId()));
//            this.permutaRepository.save(p);
//        });
//        this.permutaRepository.findBySolicitada(permuta.getOfertada()).forEach(p -> {
//            p.setFinalizada(!p.getId().equals(permuta.getId()));
//            this.permutaRepository.save(p);
//        });

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
        Optional<Permuta> permutaOptional = this.permutaRepository.findBySolicitadaAndOfertada(solicitada, ofertada);
        if (permutaOptional.isPresent()) {
            throw new BadRequestException("El bien seleccionado ya fue ofertado para esta publicación.");
        }
        if (this.alquilerRepository.findByEmbarcacionIn(this.embarcacionRepository
                .findAllById(Stream.of(solicitada, ofertada)
                        .mapToLong(publicacion -> publicacion.getBien().getId()).boxed().toList())).isEmpty()) {
            throw new BadRequestException("Al menos uno de los bienes a permutar debe ser una embarcación amarrada en puerto.");
        }
        return this.permutaRepository.save(new Permuta(solicitada, ofertada));
    }

    @Override
    public Iterable<Permuta> listarSolicitudes(Publicacion publicacion) {
        return this.permutaRepository.findBySolicitada(publicacion);
    }

<<<<<<< HEAD
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
		
		return this.permutaRepository.save(permuta);
	}
=======
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

        this.patch(permuta.getId(), entity -> this.updateMapper(entity, permuta), entity -> true);

        return permuta;
    }

    private Permuta updateMapper(Permuta entity, Permuta permuta) {
        return permuta;
    }
>>>>>>> 3e0a817486e86c5dc7ccd13f00a0b45c4a347a10
}
