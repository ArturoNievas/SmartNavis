USE smartnavis;

INSERT INTO smartnavis.puertos (nombre) VALUES
	 ('La Plata'),
	 ('La Plata II'),
	 ('Ensenada'),
	 ('Quilmes'),
	 ('Puerto Madero'),
	 ('San Fernando'),
	 ('San Isidro');

SET @la_plata = (SELECT id FROM smartnavis.puertos WHERE nombre = 'La Plata');
SET @la_plata_2 = (SELECT id FROM smartnavis.puertos WHERE nombre = 'La Plata II');
SET @ensenada = (SELECT id FROM smartnavis.puertos WHERE nombre = 'Ensenada');
SET @quilmes = (SELECT id FROM smartnavis.puertos WHERE nombre = 'Quilmes');
SET @pto_madero = (SELECT id FROM smartnavis.puertos WHERE nombre = 'Puerto Madero');
INSERT INTO smartnavis.amarras (disponible,calado,eslora,manga,nombre,puerto_id) VALUES
	 (0,120.0,140.0,300.0,'1-A',@la_plata),
	 (1,120.0,140.0,300.0,'1-B',@la_plata),
	 (1,120.0,140.0,300.0,'1-C',@la_plata),
	 (1,120.0,140.0,300.0,'1-D',@la_plata),
	 (1,210.0,500.0,180.0,'2-A',@la_plata),
	 (1,340.0,900.0,250.0,'2-B',@la_plata),
	 (1,120.0,140.0,300.0,'1-A',@la_plata_2),
	 (1,120.0,140.0,300.0,'1-B',@la_plata_2),
	 (1,210.0,500.0,180.0,'2-A',@la_plata_2),
	 (1,340.0,900.0,250.0,'2-B',@la_plata_2),
	 (1,120.0,140.0,300.0,'Marina Norte - 1',@ensenada),
	 (1,120.0,140.0,300.0,'Marina Norte - 2',@ensenada),
	 (1,120.0,140.0,300.0,'Marina Norte - 3',@ensenada),
	 (1,120.0,140.0,300.0,'Marina Norte - 4',@ensenada),
	 (1,210.0,500.0,180.0,'Marina Sur - 1',@ensenada),
	 (1,340.0,900.0,250.0,'Marina Sur - 2',@ensenada),
	 (1,120.0,140.0,300.0,'A',@quilmes),
	 (1,120.0,140.0,300.0,'B',@quilmes),
	 (1,120.0,140.0,300.0,'C',@quilmes),
	 (1,120.0,140.0,300.0,'I',@quilmes),
	 (1,120.0,140.0,300.0,'II',@quilmes),
	 (1,120.0,140.0,300.0,'III',@quilmes),
	 (1,120.0,140.0,300.0,'IV',@quilmes),
	 (1,120.0,140.0,300.0,'V',@quilmes),
	 (1,120.0,140.0,300.0,'C01',@pto_madero),
	 (1,120.0,140.0,300.0,'C02',@pto_madero),
	 (1,120.0,140.0,300.0,'C03',@pto_madero),
	 (1,120.0,140.0,300.0,'C04',@pto_madero),
	 (1,120.0,140.0,300.0,'C05',@pto_madero),
	 (1,210.0,500.0,180.0,'M01',@pto_madero),
	 (1,210.0,500.0,180.0,'M02',@pto_madero),
	 (0,340.0,900.0,250.0,'G01',@pto_madero),
	 (0,340.0,900.0,250.0,'G02',@pto_madero),
	 (0,340.0,900.0,250.0,'G03',@pto_madero);

INSERT INTO smartnavis.personas (apellidos,dni,fecha_nacimiento,nombres, habilitada_intercambio) VALUES
	 ('Marino',11111111,'1950-03-13 00:00:00','Simbad',0),
     ('Beto',25487754,'1950-03-13 00:00:00','Capitan Beto',0),
	 ('Colon',22222222,'1940-05-17 00:00:00','Cristobal',1),
	 ('Magallanes',33333333,'1955-06-20 00:00:00','Fernando',1),
	 ('Cook',11222333,'1969-10-11 00:00:00','James',1),
	 ('Crusoe',22333444,'1975-12-20 00:00:00','Robinson',1),
	 ('Argonauta',33222111,'1980-02-14 00:00:00','Jason',1),
	 ('Itaca',33444555,'1986-12-27 00:00:00','Odiseo',1),
	 ('Nemo',12345678,'1976-04-30 00:00:00','Cap',0),
	 ('Sparrow',21543876,'1969-09-16 00:00:00','Jack',1),
	 ('Brown',22888999,'1977-12-17 00:00:00','Guillermo',1),
	 ('Dumas',33777666,'1965-03-28 00:00:00','Vito',1);
	 
SET @simbad = (SELECT id FROM smartnavis.personas WHERE nombres = 'Simbad');
SET @beto = (SELECT id FROM smartnavis.personas WHERE nombres = 'Capitan Beto');
SET @cristobal = (SELECT id FROM smartnavis.personas WHERE nombres = 'Cristobal');
SET @jason = (SELECT id FROM smartnavis.personas WHERE nombres = 'Jason');
SET @odiseo = (SELECT id FROM smartnavis.personas WHERE nombres = 'Odiseo');
SET @jack = (SELECT id FROM smartnavis.personas WHERE nombres = 'Jack');
SET @guillermo = (SELECT id FROM smartnavis.personas WHERE nombres = 'Guillermo');
SET @vito = (SELECT id FROM smartnavis.personas WHERE nombres = 'Vito');
INSERT INTO smartnavis.usuarios (password,username,persona_id, role) VALUES
	 ('simbad','simbad',@simbad,'USUARIO'),
     ('beto','beto',@beto,'USUARIO'),
	 ('cristobal','cristobal',@cristobal,'ADMINISTRADOR'),
	 ('odiseo','odiseo',@odiseo,'USUARIO'),
	 ('jack','jack',@jack,'USUARIO'),
	 ('guillermo','guillermo',@guillermo,'ADMINISTRADOR'),
	 ('vito','vito',@vito,'USUARIO');

INSERT INTO smartnavis.administradores (usuario_id) VALUES
	 (@cristobal),
	 (@guillermo);
	 
INSERT INTO smartnavis.bienes (tipo,patente,partida,matricula,calado,eslora,manga,nombre,persona_id,habilitado_intercambio) VALUES
	 ('E',NULL,NULL,'REY 12345Z',120.0,140.0,300,'Dhow',@simbad,0),
	 ('E',NULL,NULL,'REY 54321',340.0,900.0,250.0,'Santa Maria',@cristobal,1),
	 ('E',NULL,NULL,'REY 54322',340.0,900.0,250.0,'Pinta',@cristobal,1),
	 ('E',NULL,NULL,'REY 54323Z',340.0,900.0,250.0,'Niña',@cristobal,0),
	 ('E',NULL,NULL,'REY 11222Z',340.0,900.0,250.0,'Argo',@jason,0),
	 ('E',NULL,NULL,'REY 11223',340.0,900.0,250.0,'Arquero',@odiseo,1),
	 ('E',NULL,NULL,'REY 11224',340.0,900.0,250.0,'Arquero II',@odiseo,1),
	 ('E',NULL,NULL,'REY 22334',450.0,1100.0,350.0,'Perla Negra',@jack,1),
	 ('E',NULL,NULL,'REY 33224Z',450.0,1100.0,350.0,'Holandes Errante',@jack,0),
	 ('E',NULL,NULL,'REY 45555',210.0,500.0,180.0,'Lehg I',@vito,1),
	 ('E',NULL,NULL,'REY 45556',210.0,500.0,180.0,'Lehg II',@vito,1),
	 ('I',NULL,'123-123123-1',NULL,NULL,NULL,NULL,NULL,@simbad,1),
	 ('I',NULL,'321-321321-3',NULL,NULL,NULL,NULL,NULL,@cristobal,1),
	 ('I',NULL,'111-222222-1',NULL,NULL,NULL,NULL,NULL,@odiseo,1),
	 ('I',NULL,'111-222222-2',NULL,NULL,NULL,NULL,NULL,@odiseo,1),
	 ('I',NULL,'111-222222-3Z',NULL,NULL,NULL,NULL,NULL,@odiseo,0),
	 ('A','ABC-123',NULL,NULL,NULL,NULL,NULL,NULL,@jack,1),
	 ('A','AAA-111',NULL,NULL,NULL,NULL,NULL,NULL,@vito,1),
	 ('A','AAA-222Z',NULL,NULL,NULL,NULL,NULL,NULL,@vito,0);

INSERT INTO smartnavis.bienes (tipo,patente,partida,matricula,calado,eslora,manga,nombre,persona_id,habilitado_intercambio) VALUES
	('E',NULL,NULL,'REY 98765',500.0,300.0,500,'Spinetta',@beto,1);

SET @dhow = (SELECT id FROM smartnavis.bienes WHERE nombre = 'Dhow');
SET @lehg_2 = (SELECT id FROM smartnavis.bienes WHERE nombre = 'Lehg II');
SET @santa_maria = (SELECT id FROM smartnavis.bienes WHERE nombre = 'Santa Maria');
SET @arquero = (SELECT id FROM smartnavis.bienes WHERE nombre = 'Arquero');
SET @argo = (SELECT id FROM smartnavis.bienes WHERE nombre = 'Argo');
SET @perla = (SELECT id FROM smartnavis.bienes WHERE nombre = 'Perla Negra');
INSERT INTO smartnavis.alquileres (fin,inicio,amarra_id,embarcacion_id) VALUES
	 ('2025-04-30', '2024-05-01', (SELECT id FROM smartnavis.amarras WHERE nombre = '1-A' AND puerto_id = @la_plata), @dhow),
	 ('2024-06-12', '2023-06-13', (SELECT id FROM smartnavis.amarras WHERE nombre = '1-B' AND puerto_id = @la_plata), @lehg_2),
	 ('2024-12-31', '2024-01-01', (SELECT id FROM smartnavis.amarras WHERE nombre = 'G01'), @santa_maria),
	 ('2025-03-14', '2024-03-15', (SELECT id FROM smartnavis.amarras WHERE nombre = 'G02'), @arquero),
	 ('2025-03-14', '2024-03-15', (SELECT id FROM smartnavis.amarras WHERE nombre = 'G03'), @argo);
	 
INSERT INTO smartnavis.alquileres_terceros (parentezco,alquiler_id,persona_id) VALUES
('Amigo', (SELECT id FROM smartnavis.alquileres WHERE embarcacion_id = @argo), @odiseo);

INSERT INTO smartnavis.publicaciones (descripcion,titulo,bien_id) VALUES
	 ('Dos o tres viajes. Unica mano.', 'Carabela casi sin uso', @santa_maria),
	 ('Cambio por cualquier cosa ya!', 'Cambio barco', @lehg_2),
	 ('Lo cambio porque ya no lo uso', 'Barco sin uso', (SELECT id FROM smartnavis.bienes WHERE matricula = 'REY 11224')),
	 ('Hermoso dpto. 3 ambientes.', 'Dpto. f/ al mar', (SELECT id FROM smartnavis.bienes WHERE partida = '321-321321-3')),
	 ('Casa con pileta.', 'Casa quinta', (SELECT id FROM smartnavis.bienes WHERE partida = '111-222222-2')),
	 ('Sin papeles.', 'Moto joyita oportuniad!', (SELECT id FROM smartnavis.bienes WHERE patente = 'ABC-123')),
	 ('No tengo espacio', 'Nave de fibra hecha en Haedo', (SELECT id FROM smartnavis.bienes WHERE matricula = 'REY 98765')),
	 ('Tripulación incluida.', 'Barco sumergible', (SELECT id FROM smartnavis.bienes WHERE matricula = 'REY 33224Z'));

INSERT INTO smartnavis.permutas (aceptada,finalizada,pendiente,registrada,publicacion_id_ofertada,publicacion_id_solicitada) VALUES
	 (0, 0, 1, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE partida = '111-222222-2')),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @santa_maria)),
	 (0, 1, 0, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE patente = 'ABC-123')),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @santa_maria)),
	 (1, 0, 0, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE patente = 'ABC-123')),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @lehg_2)),
	 (0, 0, 1, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @santa_maria),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE partida = '321-321321-3'))),
	 (0, 1, 0, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @santa_maria),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @lehg_2)),
	 (0, 0, 1, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @santa_maria),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE matricula = 'REY 11224'))),
	(1, 0, 0, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE matricula = 'REY 98765')),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = @santa_maria)),
	(1, 0, 0, 0,
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE matricula = 'REY 33224Z')),
		(SELECT id FROM smartnavis.publicaciones WHERE bien_id = (SELECT id FROM smartnavis.bienes WHERE matricula = 'REY 11224')));