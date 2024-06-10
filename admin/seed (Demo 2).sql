USE smartnavis;

INSERT INTO smartnavis.personas (apellidos,dni,fecha_nacimiento,nombres, habilitada_intercambio) VALUES
	 ('Marino',11111111,'1950-03-13 00:00:00','Simbad',1),
	 ('Sparrow',21543876,'1969-09-16 00:00:00','Jack',1),
     ('Potter', 22222222, '1980-07-31 00:00:00', 'Harry', 1); 
	 
SET @simbad = (SELECT id FROM smartnavis.personas WHERE nombres = 'Simbad');
SET @jack = (SELECT id FROM smartnavis.personas WHERE nombres = 'Jack');
SET @harry = (SELECT id FROM smartnavis.personas WHERE nombres = 'Harry');
INSERT INTO smartnavis.usuarios (password,username,persona_id, role) VALUES
	 ('contraseña','simbad',@simbad,'ADMINISTRADOR'),
	 ('contraseña','capitanJack',@jack,'ADMINISTRADOR'),
     ('contraseña','harry',@harry,'USUARIO');

INSERT INTO smartnavis.administradores (usuario_id) VALUES
	 (@simbad),
	 (@jack);
	 
INSERT INTO smartnavis.bienes (tipo,patente,partida,matricula,calado,eslora,manga,nombre,persona_id,habilitado_intercambio) VALUES
     ('I',NULL,'111-222222-2',NULL,NULL,NULL,NULL,NULL,@harry,1),	
     ('A','ABC-123',NULL,NULL,NULL,NULL,NULL,NULL,@harry,1);

INSERT INTO smartnavis.publicaciones (descripcion,titulo,bien_id) VALUES
	('Casa de Sirius Black.', '12 Grimmauld Place', (SELECT id FROM smartnavis.bienes WHERE partida = '111-222222-2')),
    ('La escoba más rápida.', 'Nimbus 2000', (SELECT id FROM smartnavis.bienes WHERE patente = 'ABC-123'));