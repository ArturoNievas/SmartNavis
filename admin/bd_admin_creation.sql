CREATE USER
	IF NOT EXISTS
	'smartnavis_admin'@'localhost'
	IDENTIFIED WITH 'mysql_native_password'
	BY '$m4rtNav1s_adm!n';

GRANT USAGE
	ON `smartnavis`.*
	TO 'smartnavis_admin'@'localhost';

GRANT
    SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER
    ON `smartnavis`.*
	TO 'smartnavis_admin'@'localhost';

FLUSH PRIVILEGES;
