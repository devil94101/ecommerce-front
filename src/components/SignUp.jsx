import React, { Component } from 'react'
import {Redirect} from 'react-router'
export class SignUp extends Component {
    state={
        name:"",
        email:"",
        password:""
    }
    handleInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=(e)=>{
        e.preventDefault();
        this.props.register(this.state);
    }
    render() {
        return (
            <div className="grid-container top">
                
                {this.props.isLogin?(<Redirect to="/" />):null}
                <header>
          <a href="/">Home</a>
        </header>
        <main>
                 <form onSubmit={this.submit}>
                        <ul className="form-container">
                        <li>
                                <label>Name</label>
                                <input type="name" value={this.state.name} required
                                name="name"
                                onChange={this.handleInput}/>
                            </li>
                            <li>
                                <label>Email</label>
                                <input type="email" value={this.state.email} required
                                name="email"
                                onChange={this.handleInput}/>
                            </li>
                            <li>
                                <label>Password</label>
                                <input type="password" value={this.state.password} required
                                name="password"
                                onChange={this.handleInput}/>
                            </li>
                            <li>
                                <button className="button primary" type="submit" disabled={this.props.flag===1?true:false}>SignUp</button>
                            </li>
                        </ul>
                    </form>
                    <div className="kya">
                        <p >Already have an Account <span><a href="/login">Login</a></span></p>
                    </div>
                    </main>
            </div>
        )
    }
}

export default SignUp
