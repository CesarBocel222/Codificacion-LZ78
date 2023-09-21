function compressLZ78(input) {
  let dictionary = new Map();
  let compressed = [];
  let currentPhrase = "";
  let currentIndex = 0;

  for (let i = 0; i < input.length; i++) {
    currentPhrase += input[i];
    if (!dictionary.has(currentPhrase)) {
      // Agregar la nueva entrada al diccionario
      dictionary.set(currentPhrase, currentIndex++);
      let indexid = 0;
      if(dictionary.get(currentPhrase.slice(0,-1)) != null){
        indexid = dictionary.get(currentPhrase.slice(0,-1));
        indexid = indexid + 1;
      }
      // Agregar la referencia al diccionario
      compressed.push([indexid, input[i]]);
      // Reiniciar la frase actual
      currentPhrase = "";
    }
  }

  return compressed;
}

// Función para descomprimir usando LZ78
function decompressLZ78(compressed) {
  let dictionary = new Map();
  let decompressed = "";
  let currentIndex = 1;

  for (let i = 0; i < compressed.length; i++) {
    let [index, character] = compressed[i];
    let currentPhrase = dictionary.has(index) ? dictionary.get(index) : "";

    // Agregar el carácter actual a la frase descomprimida
    decompressed += currentPhrase + character;

    // Agregar la nueva entrada al diccionario
    dictionary.set(currentIndex++, currentPhrase + character);
  }

  return decompressed;
}

// Ejemplo de uso
const originalText = "Hermiston, Lakin and Jacobi ";
const compressedText = compressLZ78(originalText);
const decompressedText = decompressLZ78(compressedText);

console.log("Texto original: " + originalText);
console.log("Texto comprimido: " + JSON.stringify(compressedText));
console.log("Texto descomprimido: " + decompressedText);