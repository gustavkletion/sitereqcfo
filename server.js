const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const forumURL = 'https://www.policiarcc.com/post';
const refererURL = 'https://www.policiarcc.com/t36730-cfo-requerimentos';

app.post('/post', async (req, res) => {
    try {
        // 🔹 Definir o SID manualmente para testes
        const sid = "7be5b3b13da08084ff673e65ae87a50c"; 
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: "Mensagem não pode estar vazia!" });
        }

        const postData = new URLSearchParams({
            mode: 'reply',
            t: '36730',  // ID do tópico
            message: message, // Conteúdo da mensagem
            post: 'Enviar' // Botão de envio
        });

        const response = await axios.post(forumURL, postData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0',
                'Referer': refererURL,
                'Cookie': `fa_www_policiarcc_com_sid=${sid}`
            }
        });

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
