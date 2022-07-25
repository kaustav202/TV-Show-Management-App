import './Login.css';
import { useState, useEffect  } from 'react';
import { notification } from 'antd';
import React from 'react';
import Axios from 'axios';

Axios.defaults.withCredentials = true;


const Login = props => {

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Info Incomplete',
      description: 'Please fill out the required fields'
    });
  };

  const openNotificationWithIcon2 = (type) => {
    notification[type]({
      message: 'Invalid Password',
      description: 'User with given username already exists \nWrong password entered'
    });
  };

  const openNotificationWithIcon3 = (type) => {
    notification[type]({
      message: 'Login Successful',
      description: 'You have been successfully logged in!'
    });
  };

// const [ loggedIn, setLoggedIn ] = useState(0)
const [user, setUser] = useState('')
const [password, setPassword] = useState('')

// const [data, setData] = useState(false)

// const setLoggedHandler = ()=>{

//   setLoggedIn(1)

//   console.log("state", loggedIn)
// }

// useEffect(()=>{
//   props.onSubmit(loggedIn,user)
//   console.log("effect",loggedIn)
// },[loggedIn])


  // New user or password valid return true
  // Password fragment from backend
  // Tell Server this is the user

  // If new user create user and pass
  // If existing user validate password

// useEffect(()=>{

//   Axios.get('http://localhost:4000/api/').then((response)=>{
//       setData(response.data)
//     })
// },[])


// const checkCredentials = () =>{
    
//     if ( data.length === 0){
//       return true
//     }else{
//       const filt_users = data.filter(el => el.user === user)
//       const user_entries = filt_users.length
//       if(user_entries === 0){
//         return true
//       }else{
//         return false
//       }
//     }
// }

const storeUser = ()=>{

  Axios.post('http://localhost:4000/api/login',{
    username: user,
    pass: password
  }).then((response)=>{
      console.log("Request Resolved Successfully");

      if(response.data === false){
        openNotificationWithIcon2('error')
      }else{
        console.log("Username is not already existing or valid password")
        localStorage.setItem('token',response.data.accessToken)
        openNotificationWithIcon3('success')
        localStorage.setItem('user', user)
        localStorage.setItem('pass', password)
        // props.changeLoginHandler(true)
      }
      
  }).catch((err)=>{
      console.log("some problem occured during Login");
      console.log(err)
  })
}

const onLoginSubmit = () =>{
      if(user === '' || password === ''){
          openNotificationWithIcon('warning')
          console.log("Invalid")
      }else{
        storeUser()
        // if(validPass){
        //   // console.log("Username is not already existing or valid password")
        //   // localStorage.setItem('user', user)
        //   // localStorage.setItem('pass', password)
        //   // props.changeLoginHandler(true)
        // }else{
        //   // openNotificationWithIcon2('error')
        // }
      }
}




return (
    <div className="login-page">
        <div className="form" action='/'>
            
            <form className="login-form" action='/'>
              <input required type="text" placeholder="username" onChange={(e)=>{setUser(e.target.value)}}/>
              <input required type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
              <button onClick={onLoginSubmit} >Login</button>
            </form>

        </div>
    </div>
  )
}

export default Login;