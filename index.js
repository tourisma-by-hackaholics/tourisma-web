import app from "./app.js";
const PORT = process.env.PORT || 8001

app.listen(PORT,()=>{
    console.log(`listening on port http://localhost:${PORT}`)
})