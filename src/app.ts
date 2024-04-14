import express from "express";
import path from "path";
import indexRouter from "./routes/index";
import { handleError } from "./middleware/handleError";
import { loggingMiddleware } from "./middleware/handleLogging";
import { faviconMiddleware } from "./middleware/handleFavicon";
import { pageNotFoundMiddleware } from './middleware/handlePageNotFound';

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

app.use(handleError);

app.use(pageNotFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
