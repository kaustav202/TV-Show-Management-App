import React, { useState,useEffect } from 'react';
import './Update.css';
import { Layout, Row, Breadcrumb } from 'antd';

import {EditOutlined} from '@ant-design/icons';

const {Content} = Layout;

const Update = props => {

const[items,setItems] = useState([])

useEffect(()=>{
        setItems(props.data)
},[])




const bread = (
  <Breadcrumb style={{display: 'inline'}}>
  <Breadcrumb.Item> <a href="">Home </a></Breadcrumb.Item>
  <Breadcrumb.Item>Update Watch List</Breadcrumb.Item>
</Breadcrumb>
)

return (

    <Layout style={{ padding: '0 24px 24px',}}>

    <h1 className='updates-header' style={{ fontSize: '26px', textAlign:'center', paddingTop: '15px',fontFamily:'Montserrat'}}>{bread} <span className='updates-title'>Select TV Show to Update</span> </h1>

    <Content
      className="app-content"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 600,
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly'
      }}
    >

    <Row gutter={[{xs: 6 ,sm : 14 ,md : 28, lg:68}, 30]} style={{height:'fit-content', marginTop: '30px', width:'100%' }} >


        <div className='show-update-container'>
        {items.map( (el,ind)=>{

            return(

              <>
                 {
                   <div class="wrap">
                   <div class="post">
                   <article>
                     <header>
                       <h2> {el.title} </h2>
                       <p class="author-cred">Watched on  <a href="#">{el.platform}</a> and given Rating<a href="#"> {el.rating} </a></p>
                     </header>
                     
                   <p>{el.review}</p>  
                     <footer>
                     
                       <button class="more-link" onClick={(e)=>{ props.changeActiveHandler(el.id); props.changeToggler(!props.toggler)} }><EditOutlined /> Edit Item</button>
                     </footer>
                   </article>
                   </div>
                   </div>
                 }

              </>
            );
        })}

        { items.length === 0 && (

        <div className='home-empty-info'>
          Nothing to update.. &nbsp;Start Creating Shows for more...
        </div>
        )}
        </div>

    </Row>

    </Content>
  </Layout>
  )
}

export default Update