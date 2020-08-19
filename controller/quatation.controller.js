const db = require("../models");
const Quatation = db.quatation;
const errors = require('../config/errors');
const error = errors.errors;

exports.addQuatation = (req, res) => {
    try {
        Quatation.create(req.body)
            .then(data => {
                console.log(data);
                res.status(200).send(error.OK)
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(error.SERVER_ERROR)
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR);
    }
};

exports.allQuatations = (req, res) => {
    try {
        Quatation.findAll()
            .then(data => {
                var result = { status: 200, data: data }
                res.status(200).send(result)
            }).catch(err => {
                console.log(err);
                res.status(500).send(error.SERVER_ERROR)
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR);
    }
}

exports.Quatation = (req, res) => {
    try {
        const id = req.params.id;
        Quatation.findByPk(id)
            .then(data => {
                if (data) {
                    var result = { status: 200, data: data };
                    return res.status(200).send(result);
                } else {
                    var result = error.QUATATION_NOT_PRESENT;
                    return res.status(200).send(result);
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send(error.SERVER_ERROR)
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR);
    }
}

exports.deleteQuatation = (req, res) => {
    try {

        Quatation.destroy({
            where: { id: req.body.id }
        })
            .then(data => {
                if (data == 1) {
                    var result = error.DELETED_SUCCESSFULLY;
                    return res.status(200).send(result);
                } else {
                    var result = error.QUATATION_NOT_PRESENT;
                    return res.status(404).send(result);
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send(error.SERVER_ERROR)
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR);
    }
}

exports.updateQuatation = (req, res) => {
    try {

        Quatation.update(req.body, {
            where: { id: req.body.id }
        }).then((data) => {
            if (data == 1) {
                return res.status(200).send(error.UPDATED_SUCESSFULLY);
            } else {
                var result = error.QUATATION_NOT_PRESENT;
                return res.status(404).send(result);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send(error.SERVER_ERROR)
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR);
    }
}