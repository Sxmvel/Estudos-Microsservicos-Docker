const http = require('http');


const server = http.createServer((req, res) => {

  // Configurando a resposta
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  
  // Os dados que estão "salvos" no serviço
  const patientData = {
    id: 1,
    nome: "João da Silva",
    idade: 35,
    exame: "Raio-X do Tórax",
    status: "Normal",
    data: new Date().toISOString()
  };

  // Devolvendo os dados
  res.end(JSON.stringify(patientData));
});

// Definimos a porta de comunicação
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🏥 Patient-service rodando na porta ${PORT}`);
});