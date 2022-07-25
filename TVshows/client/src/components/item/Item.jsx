import './Item.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Rate, notification, Breadcrumb } from 'antd';
import Axios from 'axios';

Axios.defaults.withCredentials = true;


const Item = props => {

const [token, setToken] = useState(props.token)

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Update Successful',
        description: 'All updates have been propagated to database !'
    });
    };

const redirector = ()=>{
    setTimeout(()=>{
        props.editDoneHandler()
    },3000)
}

const [currData, setCurrData] = useState(props.data)

const [updatedReview, setUpdatedReview] = useState(props.oldData.review)
const [updatedRating, setUpdatedRating] = useState(props.oldData.rating)

const [oldData, setOldData] = useState(props.oldData)

const fetchData = ()=>{
    Axios.get('http://localhost:4000/api',{
        headers : {
            Authorization : `BEARER ${token}`
          }
    }).then(
        (response)=> {
            setCurrData(response.data);
        }
    ).catch((err)=>{
        console.log(err)
    })
}

const updateHandler = (id,{review,rating})=>{

    Axios.patch(`http://localhost:4000/api/${id}`,{
        review: review,
        rating: rating
    }).then(
        (response)=> {
            console.log("Updates made sucessfully");
            openNotificationWithIcon('success');
            redirector();
            console.log(response);
            fetchData();
        }
    ).catch((err)=>{
        console.log('Patch Unsuccessful',err);
    })
}


useEffect(()=>{

//   props.changeAppData(currData);
  console.log("UseEffect called");
  console.log("current data", currData, typeof(currData));
  console.log("old data",oldData, typeof(oldData));
},[currData])


const bread = (
    <Breadcrumb style={{display: 'inline'}}>
    <Breadcrumb.Item> <a href="">Home </a></Breadcrumb.Item>
    <Breadcrumb.Item> Watch List</Breadcrumb.Item>
    <Breadcrumb.Item>Update Show </Breadcrumb.Item>
    </Breadcrumb>
  )

return (
    <>
    
    

    <div className="update-wrapper">

    <h1 className='item-header'> {bread} </h1>
        <form action="" method="post">

            <h1> Update Show Details </h1>
            
            
            <label for="update-review">Review:</label>
            <textarea required id="update-review" onChange={(e)=> setUpdatedReview(e.currentTarget.value)} className="update-review" placeholder={oldData.review}  name="updated_review"></textarea>

            
            <label for="update-rating" style={{textAlign: 'left'}}>Rating</label>
            <Rate onChange={(val)=> setUpdatedRating(val)} defaultValue={oldData.rating}/>
            <button type='button' onClick={(e)=>updateHandler(props.curr,{review: updatedReview, rating: updatedRating })}> Update </button>
       </form>

    </div>
    
    </>
  )
}

export default Item