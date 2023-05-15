import React, { useState } from 'react'
import Loader from './Loader'
import Spinner from './Spinner'

const Home = ({fetchdata}) => {
   

  return (
    <div style={{backgroundColor:'red',width:'100%',height:'100vh',backgroundImage:'url(https://c4.wallpaperflare.com/wallpaper/235/517/100/pulse-obika-style-wallpaper-preview.jpg)'}}>
    <div className='homecontainer'style={{textAlign:'center',justifyContent:'center'}}>
        <h2 style={{color:'white',fontSize:'40px'}}>Welcome To WordFrequency Fetcher </h2>
    <button style={{  marginTop: '4%' }} class="btn btn-warning btn-lg" onClick={fetchdata}>Submit</button>
    <br/><br/><br/><br/>
    <h5 style={{color:'white',fontSize:'15px'}}>Click The "Submit" Button to fetch the data and have a view over graphs and histogram!</h5>
    </div>
    </div>
  )
}

export default Home
