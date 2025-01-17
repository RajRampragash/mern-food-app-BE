import express from "express";
import cors from "cors";
import connectDB from "../server/db.js" 
// import user from "./routes/User.js"
import userRoutes from "./routes/User.js"
import FoodRoutes from "./routes/Food.js"



const app = express();
app.use(express.json()); // Corrected this line
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello food panda",
  });
});

app.use('/api/user/',userRoutes)
app.use('/api/food/',FoodRoutes)


// error handel:
app.use((err,req,res,next)=>{
  const status = err.status || 500;
  const message = err.message || "Someting went wrong";
  return res.status(status).json({
    success : false,
    status,
    message
  })
})


connectDB()


const startServer = async () => {
  try {
    app.listen(5050, () => console.log(`Server started on PORT 5050`)); // Fixed the typo in the log message
  } catch (error) {
    console.log(error);
  }
};
startServer();
