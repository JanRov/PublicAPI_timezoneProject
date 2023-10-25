import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "efe6f6243a23432091834636b8881af7";


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));



app.get  ("/", async (req, res) => {
    try {
    const response = await axios.get("https://timezone.abstractapi.com/v1/current_time", {
        params: {
          api_key: API_KEY,
          location: "",
        },
      });
    res.render("index.ejs", { time: response.data.datetime, timezone: response.data.timezone_location });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs");
  }
  });

  app.get("/submit", async(req,res) =>{
    try {
      const response = await axios.get("https://timezone.abstractapi.com/v1/current_time", {
          params: {
            api_key: API_KEY,
            location: req.body.location,
          },
        });
      console.log(req.data.location);
      res.render("index.ejs", { time: response.data.datetime, timezone: response.data.timezone_location, place: requested_location });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {error: error.message});
    }




  });







app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });