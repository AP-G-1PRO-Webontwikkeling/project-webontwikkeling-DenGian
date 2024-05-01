import express from "express";
import path from "path";
import indexRouter from "./routes/index";
import languagesRouter from "./routes/languages"
import librariesRouter from "./routes/libraries"
import contactRouter from "./routes/contact"
import { handleError } from "./middleware/handleError";
import { loggingMiddleware } from "./middleware/handleLogging";
import { faviconMiddleware } from "./middleware/handleFavicon";
import { pageNotFoundMiddleware } from './middleware/handlePageNotFound';
import { connect } from "./config/database";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggingMiddleware);
app.use(faviconMiddleware);

app.use("/", indexRouter);
app.use("/languages", languagesRouter);
app.use("/libraries", librariesRouter);
app.use("/contact", contactRouter);

app.use(handleError);

app.use(pageNotFoundMiddleware);

app.listen(PORT, async() => {
  await connect();
  console.log(`Server is running on port ${PORT}`);
});
