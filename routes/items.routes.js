const { authJwt } = require("../middlewares");
const controller = require("../controller/item.controller.js");

module.exports = function (app) {
    app.use(function (_req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/items",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.allItems
    );

    app.get("/api/item/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.Item
    );

    app.get("/api/getItemsbyUser_id/:user_id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getItemsbyUser_id
    );

    app.post("/api/addItem/",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.addItem
    );

    app.delete("/api/deleteItem",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteItem
    );

    app.put("/api/updateItem",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateItem
    );

    app.get("/api/suppliersItems",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.allSuppliersItems
    );

    app.get("/api/suppliersItem/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.SuppliersItem
    );

    app.delete("/api/deleteSuppliersItem",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteSuppliersItem
    );

    app.put("/api/updateSuppliersItem",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateSuppliersItem
    );

    app.get("/api/buyersItems",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.allBuyersItems
    );

    app.get("/api/buyersItem/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.BuyersItem
    );

    app.delete("/api/deleteBuyersItem",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteBuyersItem
    );

    app.put("/api/updateBuyersItem",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateBuyersItem
    );

};