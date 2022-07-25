import './App.css';
import React from 'react';
import Homepage from './components/homepage/Homepage';
import Form from './components/addShow/Form';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import { useState, useEffect, useRef } from 'react';
import Update from './components/updateShow/Update';
import Item from './components/item/Item';



function App() {

  const isInitialMount = useRef(true);

  const [appData, setAppData] = useState([])

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser]  = useState(null)
  const [pass, setPass]  = useState(null)


  // const [addDone, setAddDone] = useState(false)
  // const [editDone, setEditDone] = useState(false)

  const [activeItem, setActiveItem] = useState(0)

  const [tab, setTab] = useState(2)

  const [toggler, setToggler] = useState(false)
  
  const [token, setToken] = useState(localStorage.getItem('token'))
  // const loginLifter = (logstate,loguser) =>{
  //   setIsLogged(logstate);
  //   setUser(loguser);
  //   console.log("In LoginLifter", "User:", loguser)
  // }

  useEffect(() => {                                     // Does not fire initially, neither when any other state changes or component re-renders
    console.log("In useEffect")
    if (isInitialMount.current) {
      console.log("Current ",isInitialMount.current)
      isInitialMount.current = false;
      console.log("Initial Mount set to False");
    } else {
      console.log("Initial Mount False")
      if(appData.length != 0){
      setTab(5)
      }
    }
  },[activeItem,toggler]);


  useEffect(()=>{

    const saved = localStorage.getItem('user');
    if(saved === 'null' || saved === null){
            setIsLogged(false)
            setUser(null)
            setPass(null)
            console.log("Not logged In")
    }else{
        setIsLogged(true)
        setUser(saved)
        setPass(localStorage.getItem('pass'))
        console.log("Local Cache set")
    }
  },[isLogged])

  
  // useEffect(()=>{
  
  //   setTab(2)
  // },[addDone,editDone])

  // useEffect(()=>{

  //   if(!isLogged){
  //     setTab(0)
  //     console.log("Is Logged")
  //   }
  // },[isLogged])
  

  const tabHandler = (ctab) =>{
    setTab(ctab)
  }

  const addDoneHandler = ()=>{
    setTab(2)
  }

  const editDoneHandler = ()=>{
    setTab(2)
  }

  const updateDoneHandler = ()=>{
    setTab(2)
  }

  const changeActiveHandler = (id)=>{
    console.log("changeActiveHandler called with id",id)
    setActiveItem(id)
  }


  const changeAppData = (data) =>{
    setAppData(data)
  }


  const changeLoginHandler = (val)=>{
      setIsLogged(val)
  }

  const changeToggler = (val)=>{
    setToggler(val)
  }


  if(isLogged){
  return (<div className='routes'>
          {console.log(appData)}
          {console.log(activeItem)}
          {tab == 2 && ( <Homepage tabHandler={tabHandler} changeAppData={changeAppData} changeActiveHandler={changeActiveHandler} changeLoginHandler={changeLoginHandler} token={token} toggler={toggler} changeToggler={changeToggler}/> ) }
          {tab == 3 && (<Form addDoneHandler={addDoneHandler} user={user} token={token} />) }
          {tab == 4 && (<Update changeActiveHandler={changeActiveHandler} activeItem={activeItem} data={appData}
          updateDoneHandler={updateDoneHandler} toggler={toggler} changeToggler={changeToggler}/>)}
          {tab == 5 && (<Item curr={activeItem} editDoneHandler={editDoneHandler} changeAppData={changeAppData} data={appData} token={token} oldData={(appData.filter(el=> el.id === activeItem)[0])}/>)}
          {tab == 1 && (<Profile/>) }
      </div> )
  }else{
    return (
      <Login changeLoginHandler={changeLoginHandler} />
    )
  }

}

export default App;
