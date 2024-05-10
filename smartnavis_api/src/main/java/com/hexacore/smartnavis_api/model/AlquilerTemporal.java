package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "alquileres_temporales")
@PrimaryKeyJoinColumn(name = "alquiler_id")
public class AlquilerTemporal extends Alquiler {
    public AlquilerTemporal() {
    }
}
