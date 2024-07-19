const frisby = require('frisby');

describe('API - Módulo de Produto', () => {

    it('Validar exceder o limite de valor do produto', async () => {
        //Fazer login
        let login = await frisby
            .post('http://165.227.93.41/lojinha-web/v2/login', {
                    "usuarioLogin": "cgts",
                    "usuarioSenha": "123456"
        });

        //Validar que não é possível adicionar produtos com valor acima de R$ 7.000,00
        return frisby
            .setup({
                request: {
                    headers: {
                        'token': login.json.data.token,
                        'Content-Type': 'application/json'
                    }
                }
            })

            .post('http://165.227.93.41/lojinha-web/v2/produto', {
                    "produtoNome": "sneakers",
                    "produtoValor": 7000.01,
                    "produtoCores": [
                        "Marrom"
                    ],
                
                    "produtoUrlMock": "N/A",
                    "componentes": []
            })
            .expect('status', 422)
            .expect('json','error', 'O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00')
    })
})