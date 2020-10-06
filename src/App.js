import React, { Component } from 'react';
import Product from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import axios from 'axios'
import {BrowserRouter as Router ,Switch,Route,Redirect} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp';
class App extends Component {
  state={
    products:[],
    sort:"",
    cartItems:[],
    isLogin:false,
    userDetail:{},
    redirect:"",
    pageNo:1,
    flag:0,
    category:"Laptops"
  }
  createOrder=(order)=>{
    alert("order successful")
    console.log(order)
  }
  removeFromCart=(id)=>{
    let cartItems=this.state.cartItems.slice()  
    cartItems=cartItems.filter(ele=>id!==ele._id)
    this.setState({
      ...this.state,
      cartItems
    })
    axios.post('https://ecommerce-backend11.herokuapp.com/user/update',{
      userId:this.state.userDetail._id,
      cartItems
    })
    .then(res=>{
        console.log(res.data)

    }).catch(err=>{
      console.log(err)
    })
  }
  addToCart=(product)=>{
    if(this.state.isLogin)
    {
        let arr=this.state.cartItems
        let flag=0;
        arr.forEach(ele=>{
          if(product._id===ele._id){
            ele.count++;
            flag=1;
          }
        })
        if(flag===0){
          arr.push({
            ...product,
            count:1
          })
        }
        this.setState({
          ...this.state,
          cartItems:arr
        })
        axios.post('https://ecommerce-backend11.herokuapp.com/user/update',{
      userId:this.state.userDetail._id,
      cartItems:arr
    })
    .then(res=>{
        console.log(res.data)

    }).catch(err=>{
      console.log(err)
    })
    }
    else{
      this.setState({
        ...this.state,
        redirect:'/login'
      })
    }
  }
  sortProducts=(e)=>{
    const sort=e.target.value
     this.setState({
       products:this.state.products.slice().sort((a,b)=>{
         if(sort==="lowest"){
            return (a.price>b.price)? 1:-1;
         }
         else if(sort==="highest"){
          return (a.price<b.price)? 1:-1;
         }
         else{
            return a._id>b._id? 1:-1;
         }
       }),
       sort
     })
  }
 componentDidMount(){
      axios.post("https://ecommerce-backend11.herokuapp.com/product/get",{
        key:this.state.category
      }).then(res=>{
        this.setState({
          ...this.state,
          products:res.data
        })
        console.log(res.data)
      }).catch(err=>{
        console.log(err.message)
      })
      if(!this.state.isLogin){
        this.storeCollector();
      }
      
  }
  login=(data)=>{
    this.setState({
      ...this.state,
      flag:1
    })
    axios.post("https://ecommerce-backend11.herokuapp.com/user/login",data)
    .then(res=>{
      console.log(res.data)
      if(res.data.err){
        this.setState({
          ...this.state,
          flag:0
        })
        alert(res.data.msg);
      }
      else{
        this.setState({
          ...this.state,
          isLogin:true,
          cartItems:res.data.user.cartItems,
          userDetail:{
            name:res.data.user.name,
            email:res.data.user.email,
            _id:res.data.user._id
          },
          redirect:"",
          flag:0
        })
        localStorage.setItem('login',JSON.stringify({
          token:res.data.token
        }))
      }
      
    }).catch(err=>{
      this.setState({
        ...this.state,
        flag:0
      })
      console.log(err);
    })
  }
  logout=()=>{
    localStorage.removeItem("login");
    this.setState({
      ...this.state,
          isLogin:false,
          cartItems:[],
          userDetail:{
          },
          redirect:"",
          sort:"",
          flag:0
    })
  }
  storeCollector=()=>{
    let store=JSON.parse(localStorage.getItem('login'));
    console.log(store)
    if(store&&store.token){
      axios.get("https://ecommerce-backend11.herokuapp.com/user/get",{
      headers:{
        "x-auth-token":store.token
      }
    }).then(res=>{
        console.log(res.data);
        if(!res.err){
          this.setState({
            ...this.state,
            isLogin:true,
            cartItems:res.data.user.cartItems,
            userDetail:{
              name:res.data.user.name,
              email:res.data.user.email,
              _id:res.data.user._id
            },
            redirect:""
          })
        }
    }).catch(err=>{
        console.log(err); 
    })
    }
  }
  categorySearch=(e)=>{
    const category=e.target.value
    this.setState({
      ...this.state,
      category
    })
    axios.post("https://ecommerce-backend11.herokuapp.com/product/get",{
        key:category
      }).then(res=>{
        this.setState({
          ...this.state,
          products:res.data
        })
        console.log(res.data)
      }).catch(err=>{
        console.log(err.message)
      })

  }
  register=(data)=>{
    this.setState({
      ...this.state,
      flag:1
    })
    axios.post("https://ecommerce-backend11.herokuapp.com/user/register",data)
    .then(res=>{
      console.log(res.data)
      if(res.data.err){
        this.setState({
          ...this.state,
          flag:0
        })
        alert(res.data.msg);
      }
      else{
        this.setState({
          ...this.state,
          isLogin:true,
          userDetail:{
            name:res.data.user.name,
            email:res.data.user.email,
            _id:res.data.user._id
          },
          redirect:"",
          flag:0
        })
        localStorage.setItem('login',JSON.stringify({
          token:res.data.token
        }))
      }
      
    }).catch(err=>{
      this.setState({
        ...this.state,
        flag:0
      })
      console.log(err);
    })
  }
  render(){
    console.log(this.state.isLogin)
    return (
      <Router>
        {this.state.redirect==="/login"?(<Redirect to={this.state.redirect} />):null}
        <Switch>
          <Route exact path="/">
      <div className="grid-container">
        <header>
          <a href='/'>React-app</a>
          {this.state.isLogin===true?(
           <div className="product-price">
           <div className="header-space">
               {this.state.userDetail.name }
           </div>
            <button className="btn " onClick={this.logout}>
                   Logout
            </button>
       </div>
          )
          :<a href='/login'>Login</a>}
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
              sort={this.state.sort}
              sortProducts={this.sortProducts}
              category={this.categorySearch}/>
              <Product products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} createOrder={this.createOrder} removeFromCart={this.removeFromCart}/>
            </div>
          </div>
        </main>
        <footer>
          All Rights Reserved!
        </footer>
      </div>
      </Route>
      <Route path="/login">
          <Login login={this.login} flag={this.state.flag} isLogin={this.state.isLogin}/>
          
      </Route>
      <Route path="/signup">
          <SignUp register={this.register} flag={this.state.flag} isLogin={this.state.isLogin}/>
      </Route>
      </Switch>
      </Router>
     );
  }
}

export default App;
