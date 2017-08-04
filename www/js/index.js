	onDeviceReady();
	function onDeviceReady(){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(iniciaDB, errorCB, successCB);
		console.log(db);
	}

	function iniciaDB(tx){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		tx.executeSql('DROP TABLE IF EXISTS Boleto');
		// tx.executeSql('CREATE TABLE IF NOT EXISTS Boleto (idabajo integer primary key AUTOINCREMENT,idBoleto integer UNIQUE, strQr text, strBarcode text, idCli interger, idCon integer,idLocB integer,nombreHISB text,documentoHISB text,strEstado text , identComprador integer)');
		tx.executeSql('DROP TABLE IF EXISTS Ingreso');
		// tx.executeSql('CREATE TABLE IF NOT EXISTS Ingreso (id integer primary key AUTOINCREMENT,idBoleto integer, strQr text, strBarcode text, idCli interger, idCon integer,idLocB integer,nombreHISB text,documentoHISB text,strEstado text)');
		tx.executeSql('DROP TABLE IF EXISTS Usuario');
		tx.executeSql('DROP TABLE IF EXISTS auditoria');
		tx.executeSql('DROP TABLE IF EXISTS concieto');
		tx.executeSql('DROP TABLE IF EXISTS localidad');
		// tx.executeSql('DROP TABLE IF EXISTS producto');
		tx.executeSql('CREATE TABLE IF NOT EXISTS usu_pedido (id integer primary key AUTOINCREMENT,id_cli integer ,id_pro integer , cantidad integer ,fecha text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS categoria (id integer primary key AUTOINCREMENT, nombre text,estado text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS producto (id integer primary key AUTOINCREMENT, id_cat integer , nombre text,estado text , precio text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS mesa (id integer primary key AUTOINCREMENT,nombre text, estado text)');
		// tx.executeSql('CREATE TABLE IF NOT EXISTS concieto (id integer primary key AUTOINCREMENT,id_con integer , nombre_c text)');
		// tx.executeSql('CREATE TABLE IF NOT EXISTS localidad (id integer primary key AUTOINCREMENT,id_con integer,id_loc integer , nombre text)');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Licores" , 1);');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Vinos" , 1);');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Shots" , 1);');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Botellas" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 1 , "Whisky" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 1 , "Ron" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 1 , "Vorka" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 2 , "Blanco" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 2 , "Tinto" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 3 , "Tres Reyes" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 3 , "100 fuegos" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 4 , "Entera de la Casa" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 4 , "Media de la Casa" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 5 , "Red Bull" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 5 , "V220" , 1);');
		
		
	}

	function errorCB(err){
		console.log("Error processing SQL: "+err.message);
	}

	function successCB() {
		console.log("success!");
	}
	$( document ).ready(function() {
		console.log( "ready!" );
		setTimeout(function(){
			ver_categorias(); 
		}, 1000);
		
	});
	
	function ver_categorias(){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(function(tx){
			tx.executeSql('SELECT * from categoria',[],function(tx,results){
				var registro = results.rows.length;
				//alert(registro);
				var datos = '';
				var tr = '';
				
				
				for(var j = 0; j < registro; j++){
					var row1 = results.rows.item(j);
					var nombre = row1.nombre;
					var id = row1.id;
					//alert('<<>>'+ nombreL);
					
					tr +='<a href="javascript:void(0);" class="sina" ><div class="boton-gris" id="categoria_'+id+'" onclick="vemarcas('+id+')">'+nombre+'</div></a>';
					//alert(tr);
					
				}
				$('#contieneCategorias').html(tr);
				
			},errorCB,successCB);
		});
		
	}
	function vemarcas(id){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(function(tx){
			tx.executeSql('SELECT * from categoria where id = ?',[id],function(tx,results){
				var registro = results.rows.length;
				for(var j = 0; j < registro; j++){
					var row1 = results.rows.item(j);
					var nombre = row1.nombre;
					var id = row1.id;
					$('#titulo').html('Categoria : ' + nombre);
				}
			},errorCB,successCB);
		});
		
		$('.boton-gris').removeClass('celestes');
		$('#categoria_'+id).addClass('celestes');
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(function(tx){
			tx.executeSql('SELECT * from producto where id_cat = ? ',[id],function(tx,results){
				var registro = results.rows.length;
				//alert(registro);
				if(registro > 0){
					var datos = '';
					var tr = '';
					tr += '	<table width = "100%">\
								<tbody>\
									<tr>\
										<th width ="15%">\
											Quitar\
										</th>\
										<th width ="55%" style ="text-align:center;">\
											Producto\
										</th>\
										<th width ="15%">\
											Agregar\
										</th>\
										<th width ="15%">\
											Seleccionar\
										</th>\
									</tr>\
								</tbody>\
							</table>\
							';
					for(var j = 0; j < registro; j++){
						var row1 = results.rows.item(j);
						var nombre = row1.nombre;
						var precio = row1.precio;
						var id_p = row1.id;
						//alert('<<>>'+ nombreL);
						tr 	+= '<a style = "padding-left:10px;" href="javascript:void(0);" class="sina">\
									<div class="boton-gris" id="sel13">\
										<table width = "100%">\
											<tbody>\
												<tr>\
													<td width ="15%">\
														<i onclick = "quitar('+id_p+')" class="fa fa-minus-square" aria-hidden="true" style = "cursor:pointer;"></i>\
													</td>\
													<td width ="55%" style ="text-align:center;font-size:12px;">\
														'+nombre+'   /   [<span style = "color:#00a2d0;"> UDS $ '+precio+' </span>]<br>\
														<center><input id="cantidadEnvio_'+id_p+'" value="1" class="form-control" type="text" style ="width:50px;text-align:center;"></center>\
													</td>\
													<td width ="15%">\
														<i onclick = "agregar('+id_p+')" class="fa fa-plus-circle" aria-hidden="true" style = "cursor:pointer;"></i>\
													</td>\
													<td width ="15%">\
														<input type = "checkbox" name="menu_check[]" value = "'+id_p+'" />\
													</td>\
												</tr>\
											</tbody>\
										</table>\
									</div>\
								</a>\
								';
						//alert(tr);
						
					}
					tr 	+= '<a style = "padding-left:10px;" href="javascript:void(0);" class="sina">\
								<div class="boton-gris" id="sel13">\
									<center>\
										<button id = "botonFin" type="button" class="btn btn-default" onclick = "grabarPedido()">COMANDAR</button><br>\
										<label id = "load"></label>\
									</center>\
								</div>\
							</a>\
							';
					$('#menu').html(tr);
					$('#modal').modal('show');
				}
			},errorCB,successCB);
		});
	}
	
	function grabarPedido(id_cli){
			
		var selected = '';    
		$("input[name='menu_check[]']:checked").each(function(){
			if (this.checked) {
				selected += $(this).val()+', ';
			}
		}); 

		if (selected != ''){
			var id_mesa2 = $('#id_mesa').val();
			var hoy = new Date();
			var d = hoy.getDate();
			var m = hoy.getMonth();
			var a = hoy.getFullYear();
			
			var mes = '';
			if(m>=1 || m <=9){
				mes = ('0'+(m+1));
			}else{
				mes = (m+1)
			}
			
			var dia = '';
			if(d>=1 || d<=9){
				dia = ('0'+d);
			}else{
				dia = d;
			}
			var fechaA = (a)+'-'+mes+'-'+dia;
			var fecha = fechaA;
			var id_cli = 0;
			//alert(id_mesa2);
			$("input[name='menu_check[]']:checked").each(function() {
				$('#botonFin').attr('disabled',true);
				$('#load').html('Espere estamos procesando su pedido');
				var id_p = $(this).val();
				var cantidad = $('#cantidadEnvio_'+id_p).val();
				// alert('productos :  '  +  id_p +  ' cantidad : '  +  cantidad + '  id_cliente ' + id_cli);
				var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
				db.transaction(function(tx){
					tx.executeSql('INSERT INTO usu_pedido (id_cli , id_pro , cantidad , fecha) VALUES (?,?,?,?);',[id_mesa2,id_p,cantidad,fecha],function(tx,results){
						
					});
				},errorCB,successCB);
			});
			
			setTimeout(function(){
				alert('gracias su pedido a sido prosesado con éxito');
				$('#modal').modal('hide');
				seleccionaMenu(2);
				verReporte();
			}, 2500);
		}else{
			alert('Debes seleccionar al menos una opción.');
			return false;
		}
			

	}
	
	
	function agregar(id){
		$('#cantidadEnvio_'+id).val(parseInt($('#cantidadEnvio_'+id).val()) + 1);
	}
	function quitar(id){
		if ($('#cantidadEnvio_'+id).val() != 0);
		$('#cantidadEnvio_'+id).val(parseInt($('#cantidadEnvio_'+id).val()) - 1);
		if ($('#cantidadEnvio_'+id).val() == 0){
			$('#cantidadEnvio_'+id).val(1);
		}
	}
	 
	function verProducto(id){
		//alert(id);
	}