
const cookieParser = require("cookie-parser");


app.use(cookieParser("secretcode"));



app.get("/getsignedcookie",(req, res) => {
  res.cookie("Made","Pak",{signed:true});
  res.send(" Done ")
});

app.get("/verify",(req,res)=>{
  console.dir(req.cookies);
  res.send(req.signedCookies);
})




app.get('/cookies',(req, res) => {

  res.cookie("tracking","you")
  res.cookie(" Made in ","Pakistan")
  res.send("cookie set")

});

app.get("/read",(req, res) => {

  console.dir(req.cookies);
  res.send(" Read cookies in console ");

});
