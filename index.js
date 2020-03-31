const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usuarioApi = require('./Api/usuario');

const saudacao = require('./saudacaoMiddleware');

const produtoApi = require('./Api/produto');
produtoApi(app, 'Olha o texto!');

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(saudacao('Kusanagi'));

app.use('/opa', (req, res, next)=>{
    console.log('Antes...');
    next();
});


app.get('/usuario', usuarioApi.obter);
app.post('/usuario', usuarioApi.salvar);

/**
 * Query String
 */
app.get('/clientes/relatorio', (req, res)=>{
    res.send(`Cliente relatório: Completo ${req.query.completo} ano = ${req.query.ano}`)
 });

 app.post('/corpo', (req, res) =>{
     let corpo = '';
     req.on('data', function(parte){
         corpo +=parte;
     });

     req.on('end', function(){
        res.send(corpo);
     });
 })

app.get('/clientes/:id', (req, res)=>{
    res.send(`Cliente ${req.params.id} selecionado`)
});

app.get("/opa", (req, res, next) => {
    // res.send('Estou <b>bem</b>!');

    /* res.json({
          name:"iPad 32 Gb",
          price: 1899.00,
          discount:0.12
     });Retorna um JSON */

    /*res.json([
        {id: 7, name:"Asuka", position:1},
        {id: 10, name:"Ayanami", position:2},
        {id: 20, name:"Rukia", position:3}
    ]);*/

    console.log('Durante...');   

    res.json({
        data: [
            {
                name: "iPad 32 Gb",
                price: 1899.00,
                discount: 0.12
            }
        ],
        count: 30,
        skip: 0,
        limit: 3,
        status: 200
    });

    next();
});

app.use('/opa', (req, res, next)=>{
    console.log('Depois...');    
});

app.listen(3000, () => {
    console.log('Backend Executando...');
});