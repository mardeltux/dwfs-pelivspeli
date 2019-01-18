var conexion = require('../lib/conexionbd');

var Competencia = function(id, nombre){
  this.id = id;
  this.nombre = nombre;
};

Competencia.obtenerTodas = function(cb){
  var consultaSql = "SELECT * from competencia";
  conexion.query(consultaSql, cb);
};

Competencia.obtenerOpciones = function(cb){
  var consultaSql = "SELECT id, poster, titulo from pelicula ORDER BY RAND() LIMIT 2";
  conexion.query(consultaSql, cb);
};

Competencia.obtenerNombreCompetencia = function(id, cb){
  var consultaSql = `SELECT nombre FROM competencia WHERE id = ${id}`;
  conexion.query(consultaSql, cb);
};

Competencia.votar = function(idCompetencia, idPelicula, cb){
  var consultaSql = `INSERT INTO voto (competencia_id, pelicula_id) values (${idCompetencia}, ${idPelicula})`;
  conexion.query(consultaSql, cb);
};

Competencia.obtenerResultados = function(idCompetencia, cb){
  var consultaSql = `SELECT pelicula_id, COUNT(*) AS votos, pelicula.poster, pelicula.titulo, competencia.nombre FROM voto JOIN competencia ON voto.competencia_id = competencia.id JOIN pelicula ON voto.pelicula_id = pelicula.id WHERE voto.competencia_id = ${idCompetencia} GROUP BY competencia_id, pelicula_id HAVING COUNT(*) >= 1 ORDER BY votos DESC LIMIT 3`;
  conexion.query(consultaSql, cb);
};

Competencia.obtenerGeneros = function(cb){
  var consultaSql = "SELECT * from genero";
  conexion.query(consultaSql, cb);
};

Competencia.obtenerDirectores = function(cb){
  var consultaSql = "SELECT * from director";
  conexion.query(consultaSql, cb);
};

Competencia.obtenerActores = function(cb){
  var consultaSql = "SELECT * from actor";
  conexion.query(consultaSql, cb);
};

Competencia.agregarCompetencia = function(competenciaInfo, cb){
  var consultaSql = `INSERT INTO competencia (nombre, genero_id, director_id, actor_id) VALUES ('${competenciaInfo.nombre}', ${competenciaInfo.genero}, ${competenciaInfo.director}, ${competenciaInfo.actor})`;
  //var consultaSql = `INSERT INTO competencia (nombre) VALUES ('${competenciaInfo.nombre}')`;
  console.log(consultaSql);
  conexion.query(consultaSql, cb);
};

Competencia.verificaExistenciaCompetencia = function(nombre, cb){
  var consultaSql = `SELECT nombre FROM competencia WHERE nombre = '${nombre}'`;
  conexion.query(consultaSql, cb);
};

Competencia.eliminarVotos = function(idCompetencia, cb){
  var consultaSql = `DELETE FROM voto WHERE competencia_id = ${idCompetencia}`;
  conexion.query(consultaSql, cb);
};
//SELECT competencia.id, competencia.nombre, genero.nombre genero, director.nombre director, actor.nombre actor FROM competencia LEFT JOIN genero ON genero_id = genero.id LEFT JOIN director ON director_id= director.id LEFT JOIN actor ON actor_id= actor.id WHERE competencia.id = " + nombreCompetencia;
Competencia.obtenerInfoCompetencia = function(idCompetencia, cb){
  var consultaSql = `SELECT competencia.id, competencia.nombre, genero.nombre genero, director.nombre director, actor.nombre actor FROM competencia LEFT JOIN genero ON genero_id = genero.id LEFT JOIN director ON director_id = director.id LEFT JOIN actor ON actor_id = actor.id WHERE competencia.id = ${idCompetencia}`;
  conexion.query(consultaSql, cb);
};

Competencia.eliminarCompetencia = function(idCompetencia, cb){
  var consultaSql = `DELETE FROM competencia WHERE id = ${idCompetencia}`;
  conexion.query(consultaSql, cb);
};
Competencia.editarCompetencia = function(nuevaInfo, cb){
  var consultaSql = `UPDATE competencia SET nombre = '${nuevaInfo.nuevoNombre}' WHERE id = ${nuevaInfo.idCompetencia}`;
  conexion.query(consultaSql, cb);
};

module.exports = Competencia;
