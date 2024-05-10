import express from "express";
import path from "path";
import indexRouter from "./routes/index";
import loginRouter from "./routes/login"
import registerRouter from "./routes/register";
import logoutRouter from "./routes/logout"
import tacRouter from "./routes/tac";
import languagesRouter from "./routes/languages";
import librariesRouter from "./routes/libraries";
import contactRouter from "./routes/contact";
import { handleError } from "./middleware/handleError";
import { loggingMiddleware } from "./middleware/handleLogging";
import { faviconMiddleware } from "./middleware/handleFavicon";
import { pageNotFoundMiddleware } from "./middleware/handlePageNotFound";
import { secureMiddleware } from "./middleware/handleSecure";
import { redirectIfLoggedIn } from "./middleware/handleUserLogedIn";
import { flashMiddleware } from "./middleware/handleFlashMessage";
import session from "./config/session";
import { connect } from "./config/database";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggingMiddleware);
app.use(faviconMiddleware);

app.use(session);

app.use(flashMiddleware);

app.use("/", indexRouter);
app.use("/login", redirectIfLoggedIn, loginRouter);
app.use("/register", registerRouter);
app.use("/languages", secureMiddleware, languagesRouter);
app.use("/libraries", secureMiddleware, librariesRouter);
app.use("/contact", contactRouter);
app.use("/logout", logoutRouter);
app.use("/tac", tacRouter);

app.use(handleError);

app.use(pageNotFoundMiddleware);

app.listen(PORT, async () => {
	try {
		await connect();
		console.log(`Server is running on port ${PORT}`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
});
