import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))
app.use(express.json({limit:'20kb'}))
app.use(express.urlencoded({extended:true,limit:'20kb'}))
app.use(express.static("public"));
app.use(cookieParser());


import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import userRoutes from './routes/user.routes.js'
import wishListRoutes from './routes/wishList.routes.js'

app.use("/products",productRoutes)
app.use("/cart",cartRoutes)
app.use("/user",userRoutes)
app.use("/wishlist",wishListRoutes)

export {app}