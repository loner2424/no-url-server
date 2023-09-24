const shortid = require("shortid");
const URL = require("../models/UrlConverterModel");

async function handleGetAllURLs(req,res){
  const user_id = req.params.userID
  const URLs = await URL.find({user_id})
  res.status(200).json(URLs)
}

async function handleGenerateNewShortURL(req, res) {
    const userID = req.body.user_id
    
  
  
  const body = req.body;
  if (!body.redirecturl) return res.status(400).json({ error: "url is required" });
  
  var shortID = shortid();
  if(body.customID){
    const exists = await URL.find({shortId:body.customID}) 
    
    if(exists.length>0){
      return res.status(400).json("Sorry! This custom URL is not available!")
    }
    else
    shortID = body.customID;
  }


  await URL.create({
    shortId: shortID,
    redirectURL: body.redirecturl,
    user_id:userID
  });

  return res.json({ id: shortID });
}

async function handleRedirect(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne(
      {
        shortId,
      }  
    );
    const newurl = entry.redirectURL.toString()
    if(newurl!=null) {
        res.redirect(newurl);
      }
    
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirect,
    handleGetAllURLs
  };
