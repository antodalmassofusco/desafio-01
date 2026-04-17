import { readFile } from "fs/promises";

// Función para leer el archivo JSON y devolverlo como array de objetos
function readJSON(file) {
  return readFile(file, "utf8").then((data) => JSON.parse(data));
}

(async function main() {
  try {
    const data = await readJSON("./data/tbbt.json");

    // 1. Construir un mapa de mapas: Map<temporada, Map<nro_episodio, episodio>>
    const mapTbbt = new Map();
    
    data.forEach((element) => {
      mapTbbt.has(element.season)
        ? mapTbbt.get(element.season).set(element.episode_num, element)
        : mapTbbt.set(
            element.season,
            new Map([[element.episode_num, element]])
          );
    });

    // =================================================================
    // 📋 RESOLUCIÓN DE LOS PUNTOS PROPUESTOS
    // =================================================================

    // Introducción: Mostrar el título del episodio 22 t3 usando la estructura
    console.log("--- Introducción ---");
    // Fíjate cómo encadenamos los .get() -> Primero la temporada "3", luego el episodio "22"
    const episodio3x22 = mapTbbt.get("3").get("22"); 
    console.log(`Título del Episodio 3x22: ${episodio3x22.title}\n`);


    // Punto 2: Mostrar títulos y ratings de la temporada 1
    console.log("--- Punto 2: Temporada 1 ---");
    const temporada1 = mapTbbt.get("1"); // Esto nos devuelve el Mapa entero de la T1
    
    // Podemos usar forEach directamente sobre un Map
    temporada1.forEach((episodio) => {
      console.log(`Título: ${episodio.title} | Rating: ${episodio.imdb_rating}`);
    });


    // Punto 3: Calcular promedio de imdb_rating de la temporada 3
    console.log("\n--- Punto 3: Promedio Rating Temporada 3 ---");
    const temporada3 = mapTbbt.get("3");
    let sumaRatings = 0;

    temporada3.forEach((episodio) => {
      sumaRatings += parseFloat(episodio.imdb_rating); // Sumamos transformando el texto a decimal
    });

    // Los Map tienen una propiedad genial llamada .size que te dice cuántos elementos tienen
    const promedio = sumaRatings / temporada3.size; 
    console.log(`El promedio de rating de la temporada 3 es: ${promedio.toFixed(2)}`);

  } catch (error) {
    console.error("Error al consumir el archivo JSON:", error);
  }
})();