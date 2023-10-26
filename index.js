import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "efe6f6243a23432091834636b8881af7";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://timezone.abstractapi.com/v1/current_time",
      {
        params: {
          api_key: API_KEY,
          location: "Los Angeles, CA",
        },
      }
    );
    res.render("index.ejs", {
      time: response.data.datetime,
      timezone: response.data.timezone_location,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs");
  }
});
*/

/*
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req,res)=>{
  let location= req.body.location;
});
*/
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://timezone.abstractapi.com/v1/current_time",
      {
        params: {
          api_key: API_KEY,
          location: req.query.location,
        },
      }
    );
    res.render("index.ejs", {
      timezone_name: response.data.timezone_name,
      datetime: response.data.datetime,
      requested_location: response.data.requested_location,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message, message: "Please choose a location." });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
