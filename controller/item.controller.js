const db = require("../models");
const Items = db.items
const errors = require('../config/errors');
const error = errors.errors;

exports.allItems = (req, res) => {
    try {
        Items.findAll().then(data => {
            var result = { status: 200, data: data }
            res.status(200).send(result)
        }).catch(err => {
            console.log(err);
            res.status(500).send(error.SERVER_ERROR)
        });

    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR)
    }
}

exports.getItemsbyUser_id = (req, res) => {
    try {
        Items.findAll({ where: { user_id: req.params.user_id } })
            .then(data => {
                if (data) {
                    var result = { status: 200, data: data }
                    res.status(200).send(result)
                } else {
                    var result = error.ITEM_NOT_PRESENT;
                    return res.status(404).send(result);
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send(error.SERVER_ERROR)
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR)
    }
}

exports.Item = (req, res) => {
    try {
        const id = req.params.id;
        Items.findByPk(id)
            .then(data => {
                if (data) {
                    var result = { status: 200, data: data }
                    res.status(200).send(result)
                } else {
                    var result = error.ITEM_NOT_PRESENT;
                    return res.status(404).send(result);
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send(error.SERVER_ERROR)
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR)
    }
}

exports.addItem = (req, res) => {
    try {

        Items.findOne({
            where: {
                item_name: req.body.item_name,
                item_type: req.body.item_type
            }
        }).then(function (data) {
            if (data.length == 0) {
                Items.create(req.body).then(async function (data) {
                    if (data && data.id) {
                        var result = error.OK;
                        return res.status(200).send(result);
                    }
                }).catch(function (err) {
                    console.log(err);
                    return res.status(500).send(error.SERVER_ERROR)
                });
            }
            else {
                return res.status(200).send(error.ITEM_PRESENT);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send(error.SERVER_ERROR)
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR)
    }
}

exports.deleteItem = (req, res) => {
    try {
        Items.destroy({
            where: { id: req.body.id }
        })
            .then(data => {
                if (data == 1) {
                    var result = error.DELETED_SUCCESSFULLY;
                    return res.status(200).send(result);
                } else {
                    var result = error.ITEM_NOT_PRESENT;
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

exports.updateItem = (req, res) => {
    try {

        Items.update(req.body, {
            where: { id: req.body.id }
        }).then((data) => {
            if (data == 1) {
                return res.status(200).send(error.UPDATED_SUCESSFULLY);
            } else {
                var result = error.ITEM_NOT_PRESENT;
                return res.status(404).send(result);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send(error.SERVER_ERROR)
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR)
    }
}

exports.allSuppliersItems = (req, res) => {
    try {
        Items.findAll({
            where: { item_type: "supplier" }
        }).then(data => {
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

exports.SuppliersItem = (req, res) => {
    try {
        Items.findOne({ where: { id: req.params.id, item_type: "supplier" } })
            .then(data => {
                if (data) {
                    var result = { status: 200, data: data }
                    res.status(200).send(result)
                } else {
                    var result = error.ITEM_NOT_PRESENT;
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

exports.deleteSuppliersItem = (req, res) => {
    try {

        Items.destroy({
            where: { id: req.body.id, item_type: "supplier" }
        })
            .then(data => {
                if (data == 1) {
                    var result = error.DELETED_SUCCESSFULLY;
                    return res.status(200).send(result);
                } else {
                    var result = error.ITEM_NOT_PRESENT;
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

exports.updateSuppliersItem = (req, res) => {
    try {
        const id = req.body.id;

        Items.update(req.body, {
            where: { id: id, item_type: "supplier" }
        }).then((data) => {
            if (data == 1) {
                return res.status(200).send(error.UPDATED_SUCESSFULLY);
            } else {
                var result = error.ITEM_NOT_PRESENT;
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

exports.allBuyersItems = (req, res) => {
    try {
        Items.findAll({
            where: { item_type: "buyer" }
        }).then(data => {
            var result = { status: 200, data: data }
            res.status(200).send(result)
        }).catch(err => {
            console.log(err);
            res.status(500).send(error.SERVER_ERROR)
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(error.SERVER_ERROR)
    }
}

exports.BuyersItem = (req, res) => {
    try {
        Items.findOne({ where: { id: req.params.id, item_type: "buyer" } })
            .then(data => {
                if (data) {
                    var result = { status: 200, data: data }
                    res.status(200).send(result)
                } else {
                    var result = error.ITEM_NOT_PRESENT;
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

exports.deleteBuyersItem = (req, res) => {
    try {
        Items.destroy({
            where: { id: req.body.id, item_type: "buyer" }
        })
            .then(data => {
                if (data == 1) {
                    var result = error.DELETED_SUCCESSFULLY;
                    return res.status(200).send(result);
                } else {
                    var result = error.ITEM_NOT_PRESENT;
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

exports.updateBuyersItem = (req, res) => {
    try {
        Items.update(req.body, {
            where: { id: req.body.id, item_type: "buyer" }
        }).then((data) => {
            if (data == 1) {
                return res.status(200).send(error.UPDATED_SUCESSFULLY);
            } else {
                var result = error.ITEM_NOT_PRESENT;
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

