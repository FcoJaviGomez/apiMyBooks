const express = require('express');
const app = express();
const cors = require('cors');
let mysql = require("mysql2");
let puerto = process.env.PORT || 3000;
const { request, response } = require('express');

let connection = mysql.createConnection(
    {
        host: "automate.cuu638eryjoo.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "TomasTurbo",
        database: "autoMate"
    }
);

connection.connect(function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Conexion correcta');
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/login', (request, response) => {

    let sql;
    sql = `SELECT id_user_book,name,lastName,email,url FROM user WHERE email= 
    "${request.body.email}" AND password= "${request.body.password}"`
    console.log(request.body)
    console.log(sql);

    connection.query(sql, function (err, result) {
        if (err)
            console.log(err);
        else {
            console.log(result)
            response.send(result);
        }
    })
})

app.post('/register', (request, response) => {
    {
        console.log(request.body);

        let sql = "INSERT INTO user_book (name, lastName, email, url, password) " +
            "VALUES ('" + request.body.name + "', '" +
            request.body.lastName + "', '" +
            request.body.email + "', '" +
            request.body.url + "', '" +
            request.body.password + "')";
        console.log(sql);
        connection.query(sql, function (err, result) {
            if (err)
                console.log(err);
            else {
                console.log(result);
                if (result.insertId) {
                    console.log(result.insertId);
                    response.send(String(result.insertId));
                }
                else
                    response.send("-1");
            }
        })
    }
})

app.get('/books', (request, response) => {
    let sql;
    let id_user_book = request.query.id_user_book
    let id_book = request.query.id_book
    console.log(id_user_book);
    console.log(id_book);
    if (request.query.id_book == null) {
        sql = `SELECT * FROM book WHERE id_user_book=${id_user_book}`
    }
    else
        sql = `SELECT * FROM book WHERE id_user_book=${id_user_book} AND id_book=${id_book}`

    connection.query(sql, function (err, result) {
        if (err)
            console.log(err);
        else {
            response.send(result);
        }
    })
})

app.post('/books', (request, response) => {
    {
        console.log(request.body);

        let sql = "INSERT INTO book (id_user_book, title, bookType, author, price, photo) " +
            "VALUES ('" + request.body.id_user + "', '" +
            request.body.title + "', '" +
            request.body.bookType + "', '" +
            request.body.author + "', '" +
            request.body.price + "', '" +
            request.body.photo + "')";
        console.log(sql);
        connection.query(sql, function (err, result) {
            if (err)
                console.log(err);
            else {
                console.log(result);
                if (result.insertId) {
                    console.log(result.insertId);
                    response.send(String(result.insertId));
                }
                else
                    response.send("-1");
            }
        })
    }
})

app.put('/books', (request, response) => {
    let sql;
    console.log(request.body);
    sql = `UPDATE book SET title = "${request.body.title}" ,bookType = "${request.body.bookType}" ,
    author = "${request.body.author}" ,price = ${request.body.price} ,photo = "${request.body.photo}" 
    WHERE id_book = ${request.body.id_book} `



    // sql = "UPDATE book SET title = COALESCE(?,title) , " +
    // "bookType = COALESCE(?,bookType) , " +
    // "author = COALESCE(?,author) , " +
    // "price = COALESCE(?,price) , " +
    // "photo = COALESCE(?,photo) , " +
    // "WHERE id_book = ? "

    // sql = `UPDATE book SET 
    // title = "COALESCE(${request.body.title},title)" ,
    // bookType = "COALESCE(${request.body.bookType},bookType)" ,
    // author = "COALESCE(${request.body.author},author)" ,
    // price = COALESCE(${request.body.price},price) ,
    // photo = "COALESCE(${request.body.photo},photo)" 
    // WHERE id_book = ${request.body.id_book} `

    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err)
            console.log(err);
        else {
            console.log(result);
            if (result.insertId)
                response.send(String(result.insertId));
            else
                response.send("-1");
        }
    })

})

app.delete("/books", (request, response) => {
    console.log(request.body);
    let sql = `DELETE FROM book WHERE id_book = ${request.body.id_book}`
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err)
            console.log(err);
        else {
            // console.log(result)
            response.send(result);
        }
    })
})

app.listen(puerto)