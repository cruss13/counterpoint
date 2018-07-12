module.exports = {

  index(req, res, next){
    res.render("contact/index", {title: "Have a question? Please get in contact with us."});
  }

}
