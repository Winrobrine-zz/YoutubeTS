import errorHandler from "errorhandler";

import app from "./app";

if (process.env.NODE_ENV !== "production") {
    app.use(errorHandler());
}

app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});
