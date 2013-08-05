
/*
 * GET home page.
 */
var fs = require('fs');
var parseXlsx = require('excel'); 

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
			    //throw err;
  			    res.render('index', { title: 'Libros Electronicos', mensaje:'ha ocurrido un error' });
  			} else{
  				//validar formato de archivo

  				parseXlsx(ruta, function(err, data) {
    				if(err) throw err;
    				// data is an array of arrays
    				console.log("filas: "+data.length);
    				console.log("columnas: "+data[0].length);
            var cadena = "";
            for (var i = 0; i<data.length; i++) {
              
              cadena = cadena + data[i].join("|")+"\n";
             
            }
            fs.writeFile("./uploads/resultado.txt",cadena,function(err){
              if(err){
                  res.render('index', { title: 'Libros Electronicos', mensaje:'ha ocurrido un error' });
              } else{
                 var stat = fs.statSync('./uploads/resultado.txt');

                res.writeHead(200,
                  {
                    'content-type':'text/plain', 
                    'Content-Length': stat.size  
                  });
                var readStream = fs.createReadStream('./uploads/resultado.txt');
                readStream.pipe(res);

                //res.render('index', { title: 'Libros Electronicos', mensaje: "se cargo el archivo" +nombre+" se creo el archivo <a href ='./uploads/resultado.txt'>RESULTADO.TXT</a>" });
              }

            });

				  });
  			}
  			 
  		});

  	});
};

