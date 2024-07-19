const { Builder, Browser, By, until} = require('selenium-webdriver') //tudo que precisa do selenium para interagir com o browser
const assert = require('node:assert') //validação de informações

//grupo de testes
describe('WEB - Módulo de Produto', () => {

    //teste
    it('Validar exceder o limite de valor do produto', async () => {
        const navegador = await new Builder().forBrowser(Browser.CHROME).build()
        //Builder = criar um navegador, criar uma janela no navegador escolhido - browser abre.

        //quando há possibilidade de erros.
        try {//comando usado para conseguir capturar erros.
            await navegador.get('http://165.227.93.41/lojinha-web/v2/') //navegar para o site
            
            //findelement encontra o elemento e interage com ele
            //sendkeys é para digitar
            await navegador.findElement(By.id('usuario')).sendKeys('cgts')
            await navegador.findElement(By.id('senha')).sendKeys('123456')
            await navegador.findElement(By.id('btn-entrar')).click()

            //linktext procura o elemento pelo link
            await navegador.findElement(By.linkText('ADICIONAR PRODUTO')).click()

            await navegador.findElement(By.id('produtonome')).sendKeys('sneakers')
            await navegador.findElement(By.id('produtovalor')).sendKeys('700001')
            await navegador.findElement(By.id('produtocores')).sendKeys('Marrom')
            await navegador.findElement(By.id('btn-salvar')).click()

            //pegar a mensagem e validar que é a mensagem esperada
            const mensagemTela = await navegador.findElement(By.id('toast-container')).getText()
            assert.equal(mensagemTela, 'O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00')

        } finally{ //depois de executar tudo, fechar o navegador.
            await navegador.quit();
            //await aguarda para executar o próximo passo.
        }
    })

})

