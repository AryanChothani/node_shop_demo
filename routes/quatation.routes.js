const { authJwt } = require("../middlewares");
const controller = require("../controller/quatation.controller");

module.exports = function (app) {
    app.use(function (_req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/addQuatation",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.addQuatation
    );

    app.get("/api/quatations",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.allQuatations
    );

    app.get("/api/quatation/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.Quatation
    );

    app.delete("/api/deleteQuatation",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteQuatation
    );

    app.put("/api/updateQuatation",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateQuatation
    );
}