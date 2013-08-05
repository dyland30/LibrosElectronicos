
/*
 * GET home page.
 */
var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: 'Libros Electronicos', mensaje:'Genera los archivos de texto solicitados por sunat' });
};

/*exports.upload = function(req, res){
  	var path = req.files.txtArchivo.path;
	var nombre = req.files.txtArchivo.name;
	console.log(path);
	console.log(nombre);
	var fileBytes = req.headers['content-length'];
	console.log(fileBytes);
	var uploadedBytes =0;
	var archivo = fs.createWriteStream("./uploads/"+nombre);
	req.pipe(archivo);
	req.on('end',function(chunk){
		uploadedBytes += chunk.length;
		var progress = (uploadedBytes / fileBytes)*100;	
		res.write("progreso: "+ parseInt(progress,10));
	});
	*/

exports.upload = function(req, res){
	var path = req.files.txtArchivo.path;
	var nombre = req.files.txtArchivo.name;
  	var ruta = "./uploads/"+nombre;
  	fs.readFile(path,function(err, data){
  		fs.writeFile(ruta,data,function(err){
  			if(err){
  				res.render('index', { title: 'Libros Electronicos', mensaje:'ha ocurrido un error' });
  			} else{
  				//validar formato de archivo
  				res.render('index', { title: 'Libros Electronicos', mensaje:'se cargo el archivo '+nombre });
  			}
  			 
  		});

  	});
};

