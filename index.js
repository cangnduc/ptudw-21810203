require("dotenv").config();
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let expressHbs = require("express-handlebars");
let PORT = process.env.PORT || 3000;
let renderStar = require("./controllers/renderStar");
const e = require("express");
const { createPagination } = require("express-handlebars-paginate");
const session = require("express-session");
const redisStore = require("connect-redis").default;
const {createClient} = require("redis");
const redisClient = createClient({
  //url: "redis://red-cobuum8cmk4c73agcp20:6379",// internal redis
  url: process.env.REDIS_URL,
});
let passport = require("./controllers/passport");
let flash = require("connect-flash");
redisClient.connect().catch((err) => {
  console.log(err);
});
// use the static files in the public folder
app.use(express.static(__dirname + "/public"));
// use the express handlebars
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      renderStar: renderStar,
      createPagination: createPagination,
    },
  })
);

app.set("view engine", "hbs");
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 360000, httpOnly: true }, // 1 hour
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// Cart class
app.use((req, res, next) => {
  let Cart = require("./controllers/cart");
  req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
  res.locals.quantity = req.session.cart.quantity;
  res.locals.isLoggedIn = req.isAuthenticated();
  next();
});
app.use("/", require("./routes/indexRouter"));
app.use("/products", require("./routes/productsRouter"));
app.use("/user", require("./routes/authRouter"));
app.use("/user", require("./routes/userRouter"));
app.use((req, res, next) => {
  res.status(404).render("error", { message: "Page not found" });
});

app.use((err, req, res, next) => {
  res.status(500).render("error", { message: "Internal server error" });
});

//print the message when the server starts
app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
