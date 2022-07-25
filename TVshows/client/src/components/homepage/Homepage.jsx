import './Homepage.css';
import { Card, Col, Layout, Row } from 'antd';
import { DashboardOutlined, AppstoreAddOutlined, UserOutlined, EditOutlined, LogoutOutlined, DeleteOutlined } from '@ant-design/icons';
import { Menu, Avatar, Button, notification } from 'antd';
import React from 'react';
import { Rate } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';

Axios.defaults.withCredentials = true;



const Homepage = props => {

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Logged Out',
      description: `You have been logged out successfully
       Login again to continue`
    });
  };

  
  const [token, setToken] = useState(props.token)

  const [tabH, setTabH] = useState(2)

  const [deleteId, setDeleteId] = useState(null)


  const [activeNav, setActiveNav ] = useState(1)

  const onNavClick = e => {
    setActiveNav(e.key)
  }

  const [dataH,setDataH] = useState([]);


      useEffect(()=>{
    
      Axios.get('http://localhost:4000/api/',
      {
        headers : {
          Authorization : `BEARER ${token}`
        }
      }
      ).then((response)=> 
          setDataH(response.data),
          
        )
      },[deleteId])

    // useEffect(()=>{

    //   const del = parseInt(deleteId)
    //   Axios.delete(`http://localhost:4000/api/${del}`).then(
    //     setDataH(dataH),
    //     console.log("Delete Successfull")
    //   )

    //   },[deleteId])
      
    useEffect(()=>{
        props.changeAppData(dataH)
    },[dataH])
    
      const rating_labels = [ 'bad', 'average', 'okay', 'good', 'excellent'];
      const tooltips =  dataH.map((item)=>{
    
        let arr = ['','','','','']
        const ind = item.rating;
        arr[ind-1] = rating_labels[ind-1];
        return arr;
      })
    
      console.log(tooltips);
    
      const navblocks = (parseInt(dataH.length / 4) + 1);
      const nums = Array(navblocks).fill().map((_, idx) => idx+1)

      console.log(nums)

      const items1 = nums.map((item) => ({
        key: item,
        label: `nav ${item}`,
      }));

      const menu_labels=['Profile','Dashboard','Add Shows', 'Update Shows', 'Logout']

      const items2 = [UserOutlined, DashboardOutlined, AppstoreAddOutlined, EditOutlined, LogoutOutlined].map((icon, index) => {
        const key = String(index + 1);
        return {
          key: `${key}`,
          icon: React.createElement(icon),
          label: `${menu_labels[index]}`,
          // children: new Array(4).fill(null).map((_, j) => {
          //   const subKey = index * 4 + j + 1;
          //   return {
          //     key: subKey,
          //     label: `option${subKey}`,
          //   };
          // }),
        };
      });

      const onClick = (e) => {
        console.log('clicked tab', e.key, typeof(e.key));
        if( parseInt(e.key) ===  5){
              localStorage.setItem('user',null)
              localStorage.setItem('pass',null)
              console.log("Cache Flushed Successfully")
              props.changeLoginHandler(false)
              openNotificationWithIcon('success')
              setTabH(5)
        }else{
              setTabH(e.key);
        }
      };


      useEffect(()=>{
        props.tabHandler(tabH)
      },[tabH])


      const onDelete = (id)=>{

        Axios.delete(`http://localhost:4000/api/${id}`).then(
          
          setDeleteId(id)
        ).catch(
          console.log("Delete Failed")
        )
        
      }

      const { Content, Header, Footer, Sider } = Layout;




  return (
    <div className='main'>

    <Layout>

        <Header className="app-header"
                style={{
                        backgroundColor: "hsla(295, 14%, 16%, 1)",
                        display: 'flex',
                        height: '70px'
                      }}
                >
          <div className='app-header-avatar'>  
          <Avatar style={{ backgroundColor: '#222', marginLeft: '30px' }} size='large' icon={<UserOutlined />} /> 
          </div>
          <div className='user-info'>
              {localStorage.getItem('user')} 
          </div>
              <Menu className='app-header-menu' theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onClick={onNavClick} items={items1} style={{backgroundColor: "hsla(295, 14%, 16%, 1)", width: '80%' , marginLeft: '70px', margin: 'auto'}}/>
       </Header>

      <Layout>

        <Sider width={200} className="app-sider" style={{ backgroundColor: "hsla(295, 14%, 16%, 1)" }}>
          <Menu
            className='app-sider-menu'
            mode="inline"
            defaultSelectedKeys={['sub2']}
            defaultOpenKeys={['sub1']}
            style={{ backgroundColor: "#40162f", color: "hsla(69, 80%, 84%, 1)" }}
            items={items2}
            onClick={onClick}
          />
        </Sider>

        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >

        <h1 style={{ fontSize: '26px', textAlign:'center', paddingTop: '15px',fontFamily:'Montserrat'}}> Your TV Shows </h1>

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


            
              {dataH.map( (el,ind)=>{

                  return(

                    <>
                       {ind <= (4*activeNav) -1 && ind>= (4*(activeNav-1))  && (
                        <Col xs={24} sm={24} md={24} lg={12}
                          style={{height: 'fit-content'}}>
                         <Card hoverable title={`${el.title}`} 
                         onClick={(e)=> {
                          props.changeActiveHandler(el.id);
                          props.changeToggler(!props.toggler);
                          }
                         }
                         extra={<Rate disabled='true' tooltips={tooltips[ind]} value={`${el.rating}`}/>} 
                         bodyStyle={{height:'fit-content'}}
                         className='app-content-card'>
                         <section> {`${el.review}`} </section>
                         <p> {`Platform  : ${el.platform}`}  <Button
                         style={{marginRight:'20px', float: 'right'}}
                         type="primary"
                         icon={<DeleteOutlined/>}
                         onClick={(e) => {
                          onDelete(el.id);
                          e.stopPropagation();
                        }}
                         >
                         </Button></p>
                         </Card>
                         </Col>
                       )}

                    </>
                  );
              })}


              { dataH.length === 0 && (

              <div className='home-empty-info'>
                Oops.. you have no data yet. &nbsp;Start Creating Shows for more...
              </div>
              )}

          </Row>

          </Content>
        </Layout>
        <Footer/>
      </Layout>
    </Layout>

    </div>
  )
}

export default Homepage;