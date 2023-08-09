export function Preguntas() {
  var preguntas = [
    {
      pregunta: "Cuando ocurrió el grito de independencia de 1810 Simón Bolívar se encontraba en una misión diplomática en la ciudad europea de:",
      respuestas: ["París", "Roma", "Madrid", "Londres"],
      correcta: "Londres"
    },
    {
      pregunta: "¿Cuanto duro la campaña libertador?",
      respuestas: ["120 días", "78 días", "55 días", "2 años"],
      correcta: "78 días"
    },
    {
      pregunta: "¿Quienes se enfrentaron en la campaña libertadora?",
      respuestas: ["Realistas y Ejército independentista", "Conservadores y Liberales", "Realistas y Españoles", "Ejército independentista y Simón Bolívar"],
      correcta: "Realistas y Ejército independentista"
    },
    {
      pregunta: "¿Quiénes fueron los comandantes del ejército realista?",
      respuestas: ["Samano y Barreiro", "Bolívar y Samano", "Santander y Bolivar", "Barreiro y Santander"],
      correcta: "Samano y Barreiro"
    },
    {
      pregunta: "¿En qué año comenzó la Campaña Libertadora de Colombia?",
      respuestas: ["1810", "1819", "1821", "1823"],
      correcta: "1819"
    },
    {
      pregunta: "¿Cuál fue la primera gran batalla de la Campaña Libertadora?",
      respuestas: ["Pantano de Vargas", "Boyacá", "Pichincha", "Carabobo"],
      correcta: "Pantano de Vargas"
    },
    {
      pregunta: "¿Cuál fue el nombre de la estrategia militar utilizada por Bolívar en la Batalla de Boyacá?",
      respuestas: ["La Gran Sabana", "La Patria Boba", "El Pantano de Vargas", "La Estrategia de la Mulera"],
      correcta: "La Estrategia de la Mulera"
    },
    {
      pregunta: "¿En qué país se libró la Batalla de Pichincha?",
      respuestas: ["Colombia", "Ecuador", "Venezuela", "Perú"],
      correcta: "Ecuador"
    },
    {
      pregunta: "¿Qué ciudad fue liberada por el Ejército Libertador en la Batalla de Carabobo?",
      respuestas: ["Bogotá", "Caracas", "Lima", "Quito"],
      correcta: "Caracas"
    },
    {
      pregunta: "¿Cuál fue el último territorio en ser liberado por el Ejército Libertador?",
      respuestas: ["Perú", "Bolivia", "Ecuador", "Venezuela"],
      correcta: "Perú"
    },
    {
      pregunta: "¿Quién lideró la Campaña Libertadora en Venezuela?",
      respuestas: ["Simón Bolívar", "Antonio José de Sucre", "José Antonio Páez", "Rafael Urdaneta"],
      correcta: "Simón Bolívar"
    }
  ];

  return preguntas;
}

export function Puntos() {
  var puntos = [
    { n: 1, x: 1825, y: 892, nivel: 1, tipo: "eneFron", vida: 90 },
    { n: 2, x: 300, y: 400, nivel: 2, tipo: "eneFron", vida: 100 },
    { n: 3, x: 500, y: 800, nivel: 3, tipo: "eneFron", vida: 100 },
    { n: 4, x: 900, y: 610, nivel: 4, tipo: "eneFron", vida: 100 },
    { n: 5, x: 1500, y: 1700, nivel: 5, tipo: "eneFron", vida: 100 },
    { n: 6, x: 1300, y: 1300, nivel: 6, tipo: "eneFron", vida: 100 },
    { n: 7, x: 427.5, y: 1245, nivel: 7, tipo: "eneFron", vida: 100 }
  ];

  return puntos;
}

export function movimiento() {
  var movimiento = [
    [{ x: 1825, y: 892 }, { x: 406, y: 909 }, { x: 1825, y: 892 }],  // Ruta del enemigo 1
    [{ x: 500, y: 200 }, { x: 550, y: 250 }, { x: 700, y: 400 }, { x: 300, y: 500 }, { x: 500, y: 200 }],  // Ruta del enemigo 2
];

  return movimiento;
}
