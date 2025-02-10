module.exports.login = async(axios, app, port, dotenv) => {

    app.get('/callback', async (req, res) => {
        const code = req.query.code;
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;
        const redirectUri = 'http://localhost:3000/callback';
    
        const data = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
        };
    
        try {
            const response = await axios.post('https://discord.com/api/oauth2/token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            const accessToken = response.data.access_token;
    
            app.get('/', async (req, res) => {
                let m = await axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                res.sendFile(__dirname + './src/public/html/dash.html');
                
                const users = m.data
                console.log(m.data);
    
                await Member.findOneAndUpdate(
                    { _id: users.id },
                    { $set: {'_id': users.id, 'usename': users.username, 'avatar': users.avatar, 'data': m.data }}
                );
            });
    
            res.redirect('/'); 
        } catch (error) { 
            console.error('Erro ao obter o token de acesso:', error);
            res.send('Ocorreu um erro durante a autenticação.');
        }
    });
    
    
    app.listen(port, () => {
        console.log(`Servidor ouvindo na porta ${port}`);
    });
}