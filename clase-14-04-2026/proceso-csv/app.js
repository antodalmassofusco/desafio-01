import { createReadStream } from "fs";
import csv from "csv-parser";

// Función para leer archivo CSV y devolver una promesa con el resultado
function readCSV(file) {
  return new Promise((resolve, reject) => {
    const results = [];
    try {
      createReadStream(file)
        .on("error", (error) => reject(error))
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results));
    } catch (error) {
      reject(error);
    }
  });
}

// Función principal autoinvocada
(async function main() {
  try {
    const data = await readCSV("./proceso-csv/tbbt.csv");

    // 📋 A partir del array 'data', resolver:

    // Desafío 1: filter y forEach (Temporada 1)
    console.log("--- Desafío 1 ---");
    data.filter(ep => ep.season === "1")
        .forEach(ep => {
            console.log(`Título: ${ep.title} | Rating: ${ep.imdb_rating}`);
        });

    // Desafío 2: find (Episodio 3x22)
    console.log("\n--- Desafío 2 ---");
    const episodioBuscado = data.find(ep => ep.season === "3" && ep.episode_num === "22");
    if (episodioBuscado) {
        console.log(`El episodio 22 de la temporada 3 es: ${episodioBuscado.title}`);
    }

    // Desafío 3: filter y reduce (Promedio Rating T3)
    console.log("\n--- Desafío 3 ---");
    const episodiosT3 = data.filter(ep => ep.season === "3");
    const sumaRatings = episodiosT3.reduce((acumulador, ep) => acumulador + parseFloat(ep.imdb_rating), 0);
    const promedioT3 = sumaRatings / episodiosT3.length;
    
    console.log(`El promedio de rating de la temporada 3 es: ${promedioT3.toFixed(2)}`);

  } catch (error) {
    console.error("Error al leer archivo CSV:", error);
  }
})();