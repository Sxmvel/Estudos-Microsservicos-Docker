const http = require('http');

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  //Ler os dados (GET)
  if (req.method === 'GET') {
    try {
      const resultado = await pool.query('SELECT * FROM pacientes');
      res.statusCode = 200;
      res.end(JSON.stringify(resultado.rows));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ erro: "Erro interno ao buscar dados no banco." }));
    }
  }

  // ROTA 2: Cadastrar novo paciente 
  else if (req.method === 'POST') {
    let body = '';
    // Recebendo os pedaços do JSON que vêm da rede
    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', async () => {
      try {
        const novoPaciente = JSON.parse(body);

        // Instrução SQL segura
        const query = `
          INSERT INTO pacientes (nome, idade, exame, status) 
          VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const valores = [novoPaciente.nome, novoPaciente.idade, novoPaciente.exame, novoPaciente.status];

        const resultado = await pool.query(query, valores);

        res.statusCode = 201; // Criado com sucesso
        res.end(JSON.stringify({
          mensagem: "Paciente cadastrado com sucesso!",
          paciente: resultado.rows[0]
        }));
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ erro: "Erro interno ao salvar no banco de dados." }));
      }
    });
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ erro: "Método não suportado no patient-service" }));
  }
});