const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

//app.use(mongoose)
app.options('*', cors())
const multer = require('multer')
//работа с изображениями GraphicsMagick 
const gm = require('gm');
//работа с файлами
const fs = require('fs');
//Схемы документов
const Service = require('./Mongoose/Service');
const Interes = require('./Mongoose/Interes');
const RazdelInteres = require('./Mongoose/RazdelInteres');
const TestService = require('./Mongoose/TestAddService');
//Хранилище аватарок
var storage_avatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatar')
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        //cb(null, 'igor.png')
        cb(null, file.originalname)
    }
})
var avatar = multer({ storage: storage_avatar })
//multer добавления услуги
//хранилище иконок/услуги
var iconUslugi = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/var/www/website/src/assets/img/uslugi')
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        //cb(null, 'igor.png')
        cb(null, file.originalname)
    }
});

const fileFilterImg = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
var as = multer({ storage: iconUslugi, fileFilter: fileFilterImg });


//хранилище иконок/интерес
var iconInteres = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/var/www/website/src/assets/img/interes')
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        //cb(null, 'igor.png')
        cb(null, file.originalname)
    }
});

// const fileFilterImg = (req, file, cb) => {

//     if (file.mimetype === "image/png" ||
//         file.mimetype === "image/jpg" ||
//         file.mimetype === "image/jpeg") {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// }
var arhImgInteres = multer({ storage: iconInteres, fileFilter: fileFilterImg });



//Настройка хранилища файлов

// app.use(multer);
//var ggg = multer()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//const formData = require("express-form-data");
// const os = require("os");
/////////////////////////////////////////
/**
 * Options are the same as multiparty takes.
 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
 * By default, it is "false".
 */
// const options = {
//     uploadDir: os.tmpdir(),
//     autoClean: false,
//     //autoClean: true
// };

// // parse data with connect-multiparty. 
// app.use(formData.parse(options));
// // delete from the request all empty files (size == 0)
// app.use(formData.format());
// // change the file objects to fs.ReadStream 
// //app.use(formData.stream());
// // union the body and the files
// app.use(formData.union());




////////////////////////////////////////////////
// var multer = require('multer');
// var upload = multer({ dest: ' uploads / ' });

// const MongoClient = require("mongodb").MongoClient;
// // создаем объект MongoClient и передаем ему строку подключения
// const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/", { useUnifiedTopology: true });
// mongoClient.connect(function (err, client) {

//     const db = client.db("test");
//     const collection = db.collection("users");
//     let user = { name: "Tom", age: 23 };
//     collection.insertOne(user, function (err, result) {

//         if (err) {
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//     });
// });

//




// ///////////////////////////////////////////




//Обработка формы добавления услуги


app.post('/addservice', as.single("userfile"), async (req, res) => {
    //console.log(req.body);
    // let filedata = req.file;
    // console.log(filedata);
    res.set("Access-Control-Allow-Origin", '*');


    mongoose.connect("mongodb://yura:123456@localhost:27017/website", { useUnifiedTopology: true, useNewUrlParser: true });
    //console.log(req.body.parentservices);
    //const pservices = req.body.parentservices;
    // const parservices = pservices.map(function (parservice) {
    //     console.log(parservice);
    //     //       content: sotrudnik.content.rendered,
    // });

    //res.send(parservices);


    const service = new Service({
        paretn_service: req.body.parentservices,
        name_service: req.body.nameservice,
        min_price_service: req.body.minpriceservice,
    });


    await service.save(function (err) {

        //mongoose.disconnect();  // отключение от базы данных

        if (err) return console.log(err);
        console.log("Сохранен объект", service);
        // Service.find(function (err, services) {
        //     if (err) return console.error(err);
        //     console.log(services);
        //     //res.send(services);
        mongoose.disconnect();  // отключение от базы данных
        // });
        console.log('wwwwwwwwwwwww');
        res.end();
    });

    //console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqq');

});
////////////////Получить список услуг 

app.get("/services", (req, res) => {

    res.set("Access-Control-Allow-Origin", '*');


    // подключение
    mongoose.connect("mongodb://yura:123456@localhost:27017/website", { useUnifiedTopology: true, useNewUrlParser: true });


    Service.find(function (err, services) {
        if (err) return console.error(err);
        console.log(services);
        res.send(services);
        mongoose.disconnect();  // отключение от базы данных
    });


    //
    //console.log('asdasdasdasdasd');

});

/////////////////////////////////////////

app.post('/addinteres', arhImgInteres.single("userfile"), (req, res) => {
    console.log(req.body);
    // let filedata = req.file;
    // console.log(filedata);
    res.set("Access-Control-Allow-Origin", '*');


    mongoose.connect("mongodb://yura:123456@localhost:27017/website", { useUnifiedTopology: true, useNewUrlParser: true });



    const interes = new Interes({
        name: req.body.name,
        age: req.body.age
    });

    interes.save(function (err) {
        mongoose.disconnect();  // отключение от базы данных

        if (err) return console.log(err);
        console.log("Сохранен объект", razdelinteres);
    });
});

////////////////

/////////

app.post('/addrazdelinteres', arhImgInteres.single("userfile"), (req, res) => {
    console.log(req.body);
    // let filedata = req.file;
    // console.log(filedata);
    res.set("Access-Control-Allow-Origin", '*');


    mongoose.connect("mongodb://yura:123456@localhost:27017/website", { useUnifiedTopology: true, useNewUrlParser: true });



    const razdelinteres = new RazdelInteres({
        name: req.body.name,
        age: req.body.age
    });

    razdelinteres.save(function (err) {
        mongoose.disconnect();  // отключение от базы данных

        if (err) return console.log(err);
        console.log("Сохранен объект", interes);
    });
});

////////////////
app.post('/test', (req, res) => {


    console.log('test');


});


////////////////

app.post('/test/form', (req, res) => {

    res.set("Access-Control-Allow-Origin", '*');
    console.log('test/form');
    console.log(req.body.aaa);

    // // подключение
    mongoose.connect("mongodb://UserTest:UserTest@localhost:27017/test", { useUnifiedTopology: true, useNewUrlParser: true });

    //const Service = mongoose.model("Service", TestService);
    const testservice = new TestService({
        nameService: req.body.aaa,
        ageService: req.body.ccc,
        aboutService: req.body.ddd,
    });

    testservice.save(function (err) {
        mongoose.disconnect();  // отключение от базы данных

        if (err) return console.log(err);
        console.log("Сохранен объект", testservice);
    });
});
////////////////// 


////////////////

app.post('/form', (req, res) => {

    res.set("Access-Control-Allow-Origin", '*');


    // подключение
    mongoose.connect("mongodb://yura:123456@localhost:27017/users", { useUnifiedTopology: true, useNewUrlParser: true });

    const User = mongoose.model("User", userScheme);
    const user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(function (err) {
        mongoose.disconnect();  // отключение от базы данных

        if (err) return console.log(err);
        console.log("Сохранен объект", user);
    });
});
////////////////// 




/////////////////////

app.get('/users', (req, res) => {

    res.set("Access-Control-Allow-Origin", '*');


    // подключение
    mongoose.connect("mongodb://yura:123456@localhost:27017/users", { useUnifiedTopology: true, useNewUrlParser: true });

    const User = mongoose.model("User", userScheme);
    User.find(function (err, users) {
        if (err) return console.error(err);
        console.log(users);
        res.send(users);
        mongoose.disconnect();  // отключение от базы данных
    })

    //
    console.log('asdasdasdasdasd');

});
/////////////////////

app.post('/multiple-files', (req, res) => {


    res.set("Access-Control-Allow-Origin", 'http://vue.chivic.ru');


    res.send("<h2>Привет Express!</h2>");
    console.log(req.files);
});
// console.log(requ);
// res.send(requ);
app.post('/formform', avatar.single('avatar'), function (req, res) {
    gm(req.file.path)
        .resize(100, 100)
        .write('uploads/avatar/100_' + req.file.originalname, function (err) {
            if (err) console.log(err);
            // destination.txt will be created or overwritten by default.
            // fs.copyFileSync('uploads/avatar/100_' + req.file.originalname, '/var/www/vue/dist/uploads/avatar/100_' + req.file.originalname, (err) => {
            //     if (err) throw err;
            //     console.log('source.txt was copied to destination.txt');

            // });
            // fs.unlink('uploads/avatar/100_' + req.file.originalname, (err) => {
            //     if (err) throw err;

            //     console.log('source.txt удалена из to destination.txt');
            // });
            // fs.unlink('uploads/avatar/' + req.file.originalname, (err) => {
            //     if (err) throw err;

            //     console.log('source.txt удалена из to destination.txt');
            // });
        })








    // const userformScheme = new mongoose.Schema({
    //     name: String,
    //     familiya: String,
    //     pol:String,
    //     about: Array

    // })

    console.log(req.body);
    console.log(req.file.path);



    // res.set("Access-Control-Allow-Origin", '*');


    // подключение
    // mongoose.connect("mongodb://yura:123456@localhost:27017/users", { useUnifiedTopology: true, useNewUrlParser: true });

    //const Userform = mongoose.model("Userform", userformScheme);
    // const userform = new Userform({
    //     name: req.body.name,
    //     age: req.body.age
    // });

    // user.save(function (err) {
    //     mongoose.disconnect();  // отключение от базы данных

    //     if (err) return console.log(err);
    //     console.log("Сохранен объект", user);
    // });
});


//console.log('igor');

app.listen(3001);

