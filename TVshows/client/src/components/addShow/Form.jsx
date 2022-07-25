import React from "react";
import  './Form.css';
import { Popover, notification, Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import Axios from 'axios';

Axios.defaults.withCredentials = true;


const Form = props =>{

    const [token, setToken] = useState(props.token)

    const openNotificationWithIcon = (type) => {
        notification[type]({
          message: 'Transaction Successful',
          description: 'Your new show is now being Tracked \nAll changes propagated to database'
        });
      };

      const openNotificationWithIcon2 = (type) => {
        notification[type]({
          message: 'Incomplete Data',
          description: 'Please fill out all the fields'
        });
      };

      const redirector = ()=>{
        setTimeout(()=>{
            props.addDoneHandler()
        },3000)
    }
    
    
    // const onComplete = ()=>{
    //     props.addDoneHandler()
    // }

    const [inp,setInp] = useState({
        title: '',
        platform: '',
        review: '',
        rating:'1',
        user: props.user
    })

    const onTitleChange = (val) =>{

        setInp({...inp, title: val})
    }

    const onPlatformChange = (val) =>{
        
        setInp({...inp, platform: val})
    }

    const onReviewChange = (val) =>{
        
        setInp({...inp,review: val})
    }

    const onRatingChange = (val) =>{
        
        setInp({...inp, rating: val})
    }


    // const [pop,setPop] = useState(false)

    // const togglePop = () =>{

    //     setPop(!pop);
    //     setTimeout(()=> {
    //         console.log("Entering togglePop");
    //         console.log(pop);
    //         setPop(!pop);
    //         console.log(pop);
    //         console.log("Exiting togglePop");
    
    //     },3000)
    // }

    const submitHandler = props =>{
        if (inp.title == '' || inp.platform == '' || inp.review == ''){
            openNotificationWithIcon2('warning')
            return;
        }else{
            

            Axios.post('http://localhost:4000/api',{
                title: inp.title,
                platform: inp.platform,
                review: inp.review,
                rating: inp.rating,
                user: inp.user
            },{
                headers : {
                    Authorization : `BEARER ${token}`
                  }
            }).then(()=>{
                openNotificationWithIcon('success');
                redirector();
            }
                
            ).catch(
                console.log('Error in Add')
            )
        }
    }



    // window.addEventListener('mouseover',()=>{
    //     setTimeout(()=> setPop(false), 8000)
    // })

    const content = (
        <div className="alert-success">
          <p className="msg-success"> Your new show is now being Tracked </p><br></br>
          <p className="info-success">All changes propagated to database</p>
        </div>
      );

      const bread = (
        <Breadcrumb style={{display: 'inline'}}>
        <Breadcrumb.Item> <a href="">Home </a></Breadcrumb.Item>
        <Breadcrumb.Item> Add New Show</Breadcrumb.Item>
        </Breadcrumb>
      )

    return(

        
    
        <div className="form-wrapper-add">

        <h1 className='form-wrapper-header'> {bread} </h1>
        <form action="" method="post">

            <h1> Add New Shows </h1>
        
            <fieldset>
            
            <legend><span className="number">1</span> Basic Info</legend>
            
            <label for="add-name">Title:</label>
            <input required type="text" id="add-name" onChange={(e)=>onTitleChange(e.currentTarget.value)} className="add-name" name="show_title"/>
            
            <label for="add-platform">Platform</label>
            <input required type="text" id="add-platform" onChange={(e)=> onPlatformChange(e.currentTarget.value)} className="add-platform" name="show_platform"/>
        
            {/* <label>Age:</label>
            <input type="radio" id="under_13" value="under_13" name="user_age"/><label for="under_13" class="light">Under 13</label>
            <input type="radio" id="over_13" value="over_13" name="user_age"/><label for="over_13" class="light">Over 13</label>
             */}
            </fieldset>

            <fieldset>  
            
            <legend><span className="number n2">2</span> More about the show</legend>
            
            <label for="add-review">Review:</label>
            <textarea required id="add-review" onChange={(e)=> onReviewChange(e.currentTarget.value)} className="add-review"  name="show_review"></textarea>
            
        
            
            <label for="add-rating" style={{textAlign: 'center'}}>Rating</label>
            <select id="add-rating" onChange={(e)=> onRatingChange(e.currentTarget.value)} className="add-rating" name="show_rating">
            
                <optgroup className="optgrp" label="Rating" style={{padding:'3px'}}>
                <option value="1">Poor</option>
                <option value="2">Average</option>
                <option value="3"> Okay </option>
                <option value="4">Good</option>
                <option value="5">Excellent</option>
                </optgroup>
            
                {/* <optgroup label="Mobile">
                <option value="android_developer">Android Developer</option>
                <option value="ios_developer">IOS Developer</option>
                <option value="mobile_designer">Mobile Designer</option>
                </optgroup>
                <optgroup label="Business">
                <option value="business_owner">Business Owner</option>
                <option value="freelancer">Freelancer</option>
                </optgroup> */}

           </select>
        
            {/*<label>Interests:</label>
            <input type="checkbox" id="development" value="interest_development" name="user_interest"/><label class="light" for="development">Development</label>
            <input type="checkbox" id="design" value="interest_design" name="user_interest"/><label class="light" for="design">Design</label>
            <input type="checkbox" id="business" value="interest_business" name="user_interest"/><label class="light" for="business">Business</label>
            */}
        
            </fieldset>
        
            {/* <Popover
            content={content}
            title="Transaction Successful"
            trigger="click"
            visible={pop} */}
            
            <button type="button" onClick={submitHandler}  className="add-button"> Add Data </button>
            {/* </Popover> */}
        
       </form>

    </div>
    
    )
}


export default Form;