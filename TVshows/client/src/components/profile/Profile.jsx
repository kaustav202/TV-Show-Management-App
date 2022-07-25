import './Profile.css';
import React from 'react'
import { Breadcrumb } from 'antd';

const Profile = () => {

  const bread = (
    <Breadcrumb style={{display: 'inline'}}>
    <Breadcrumb.Item> <a href="">Home </a></Breadcrumb.Item>
    <Breadcrumb.Item> Profile</Breadcrumb.Item>
    </Breadcrumb>
  )

  return (
    
    <div className='profile-wrapper'>
      <div className='profile-header'>{bread} <h2> Profile Info </h2> </div>
          <div className='profile-info'>
              You are Logged in as <span className='profile-info-user'> {localStorage.getItem('user')} </span>
          </div>
    </div>
  )
}

export default Profile