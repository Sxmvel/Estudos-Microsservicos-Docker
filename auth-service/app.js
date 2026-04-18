const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Simulando a rota de login
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    
    req.on('end', () => {
      const credenciais = JSON.parse(body || '{}');

      // Verificando usuário e senha estáticos para a nossa simulação
      if (credenciais.email === 'joao@email.com' && credenciais.senha === '123456') {
        res.statusCode = 200;
        // O famoso Token (Crachá) sendo gerado!
        res.end(JSON.stringify({ 
            mensagem: "Login de sucesso!", 
            token: "token-secreto-do-joao-xyz" 
        }));
      } else {
        res.statusCode = 401;
        res.end(JSON.stringify({ erro: "Acesso Negado. Credenciais inválidas." }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ erro: "Rota não encontrada. Use POST /login" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🔐 Auth-service rodando na porta ${PORT}`);
});