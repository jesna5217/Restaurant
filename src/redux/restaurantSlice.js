import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Api call or asyncronous function using thunk
//argument 1= name of slice+/thunk name
export const fetchRestaurant=createAsyncThunk('restaurantSlice/fetchRestaurant',()=>{
    //callback function
const result=axios.get('./restaurant.json').then(response=>response.data);
console.log('result from thunk')
    console.log(result);
    //returns the result!!!
    return result;


})
//creating
const restaurantSlice=createSlice({
    name:'restaurantSlice',
    initialState:{
       loading:false,//pending state ie. API call in progress
       allRestaurant:[],//resolve state
       error:'',//reject state 
    },
extraReducers:(builder)=>{
    
    builder.addCase(fetchRestaurant.pending,(state)=>{{
    state.loading=true;
    }})
    builder.addCase(fetchRestaurant.fulfilled,(state,action)=>{
        state.loading=false;
        state.allRestaurant=action.payload;
        state.searchRestaurant=action.payload;
        state.error="";
    })
    builder.addCase(fetchRestaurant.rejected,(state,action)=>{
        state.loading=false;
        state.allRestaurant=[];
        state.error=action.error.message;
    })
},
//searching
reducers:{
 searchRestaurant:(state,action)=>{
    //we are filtering searchRestaurant asit always contains the full array
    state.allRestaurant.restaurants=state.searchRestaurant?.restaurants.filter(item=>item.neighborhood.toLowerCase().includes(action.payload.toLowerCase()))
 }
}


})
export default restaurantSlice.reducer;
export const {searchRestaurant}=restaurantSlice.actions;