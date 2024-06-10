USE smartnavis;

INSERT INTO smartnavis.personas (apellidos,dni,fecha_nacimiento,nombres, habilitada_intercambio) VALUES
	 ('Marino',11111111,'1950-03-13 00:00:00','Simbad',1),
	 ('Sparrow',21543876,'1969-09-16 00:00:00','Jack',1);
	 
SET @simbad = (SELECT id FROM smartnavis.personas WHERE nombres = 'Simbad');
SET @jack = (SELECT id FROM smartnavis.personas WHERE nombres = 'Jack');
INSERT INTO smartnavis.usuarios (password,username,persona_id, role) VALUES
	 ('contraseña','simbad',@simbad,'ADMINISTRADOR'),
	 ('contraseña','capitanJack',@jack,'ADMINISTRADOR');

INSERT INTO smartnavis.administradores (usuario_id) VALUES
	 (@simbad),
	 (@jack);
	 
INSERT INTO smartnavis.bienes (tipo,patente,partida,matricula,calado,eslora,manga,nombre,persona_id,habilitado_intercambio) VALUES
     ('I',NULL,'111-222222-2',NULL,NULL,NULL,NULL,NULL,@simbad,1),	
     ('A','ABC-123',NULL,NULL,NULL,NULL,NULL,NULL,@jack,1);

INSERT INTO smartnavis.publicaciones (descripcion,titulo,bien_id) VALUES
	('Casa con pileta.', 'Casa quinta', (SELECT id FROM smartnavis.bienes WHERE partida = '111-222222-2')),
    ('Sin papeles.', 'Moto joyita oportuniad!', (SELECT id FROM smartnavis.bienes WHERE patente = 'ABC-123'));