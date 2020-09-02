const mysqlCon = require('./mysql/index')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json())

app.post('/municipio',(req,res) => {
    const { municipio, departamento } = req.body
    mysqlCon.connection.query(`INSERT INTO Municipio(Nombre, Departamento) VALUES ('${municipio}', '${departamento}')`, (err, result) => {
        if(err) throw err
        res.json({
            ok:true,
            body: req.body,
            message: '1 row inserted'
        })
    })
})

app.get("/municipios", (req,res) => {
    let data = []
    mysqlCon.connection.query('SELECT * FROM Municipio', (error, results, fields) => {
        if (error) throw error
        data = results
        res.json({
            ok: true,
            data
        })
    })
})

app.listen(PORT, () => {
    console.log('servidor corriendo')
    mysqlCon.connection.connect((error) => {
        if (error){
            console.log('Hubo un error', error)
        } else{
            console.log('Conectado a la base de datos', mysqlCon.connection.threadId)
        }
    })
});







