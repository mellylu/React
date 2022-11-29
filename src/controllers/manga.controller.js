const Manga = require("../models/manga.model");

exports.post = (req, res) => {
    const manga = new Manga({
        name : req.body.name,
        date: req.body.date,
        book : req.body.book,
        type : req.body.type,
        description : req.body.description,
        price : req.body.price,
        image : req.body.image
    });
    manga.save()
        .then((data) => {
            res.status(200).send({
                manga : data,
                isCreated : true 
            })
        })
        .catch((err) => {
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        })
}


//GET ALL
exports.getAll = (req, res) => {
    Manga.find()
    .then((data) => {
        res.send({
            manga : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: 500,
            message: err.message
        })
    })
}

//GET ID
exports.getId = (req, res) => {
    Manga.findById(req.params.id)
    .then((data) => {
        res.send({
            manga : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
}

//UPDATE
exports.update = (req, res) => {
    Manga.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        date : req.body.date,
        book : req.body.book,
        type : req.body.type,
        description : req.body.description,
        price : req.body.price,
        image : req.body.image
    })
    .then(() => {
        Manga.findById(req.params.id)
            .then((data) => {
                res.send({
                    manga : data,
                    update : true
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message : err.message || "Some error occured"
                })
            })
    })
}

//DELETE
exports.delete = (req, res) => {
    Manga.findByIdAndDelete(req.params.id)
    .then(() => {
        res.send({
            delete : true
        })
    })
    .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
}



