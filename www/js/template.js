onDeviceReady();
function onDeviceReady(){
	var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
	db.transaction(iniciaDB, errorCB, successCB);
	console.log(db);
}

function iniciaDB(tx){
	var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
	//tx.executeSql('DROP TABLE IF EXISTS Boleto');
	tx.executeSql('CREATE TABLE IF NOT EXISTS empresa (id integer primary key AUTOINCREMENT,id_2 integer UNIQUE, nombre text, ruc text, dir text, tel integer,rep text)');
	// // tx.executeSql('DROP TABLE IF EXISTS Ingreso');
	// tx.executeSql('CREATE TABLE IF NOT EXISTS Ingreso (id integer primary key AUTOINCREMENT,idBoleto integer, strQr text, strBarcode text, idCli interger, idCon integer,idLocB integer,nombreHISB text,documentoHISB text,strEstado text)');
	// // tx.executeSql('DROP TABLE IF EXISTS Usuario');
	// tx.executeSql('CREATE TABLE IF NOT EXISTS Usuario (id integer primary key AUTOINCREMENT,idUsuario integer, strNombreU text, strMailU text, strContrasena text, strCedula text,strPerfil text,nombreHISB text,strEstadoU text)');
	// tx.executeSql('CREATE TABLE IF NOT EXISTS auditoria (id integer primary key AUTOINCREMENT,idBoleto integer, estado text, fecha text)');
	// tx.executeSql('CREATE TABLE IF NOT EXISTS concieto (id integer primary key AUTOINCREMENT,id_con integer , nombre_c text)');
	// tx.executeSql('CREATE TABLE IF NOT EXISTS localidad (id integer primary key AUTOINCREMENT,id_con integer,id_loc integer , nombre text)');
	
	
}

function errorCB(err){
	console.log("Error processing SQL: "+err.message);
}

function successCB() {
	console.log("success!");
}
