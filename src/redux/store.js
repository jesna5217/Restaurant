import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";

const store=configureStore({
    reducer:{
        //store the value globally
restaurantSlice:restaurantSlice
    }
})
export default store;