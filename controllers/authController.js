let controller = {};
controller.login = (req, res) => {
  res.status(200).json({ message: "Login successful" });
};
controller.show = (req, res) => {
  res.status(200).render("login");
};
module.exports = controller;