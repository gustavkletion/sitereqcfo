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
        const { sid, message } = req.body;

        if (!sid) {
            return res.status(403).json({ success: false, error: "Erro: Você precisa estar logado no fórum!" });
        }

        const postData = new URLSearchParams({
            mode: 'reply',
            t: 36730,  
            message: message,
            post: 'Enviar',
            sid: sid
        });

        const response = await axios.post(forumURL, postData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': refererURL,
                'Cookie': `fa_www_policiarcc_com_sid=${sid}`
            }
        });

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
