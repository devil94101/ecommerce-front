import React, { Component } from 'react'
import { Redirect } from 'react-router'

export class Login extends Component {
    state={
        password:"",
        email:""
    }
    handleInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=(e)=>{
        e.preventDefault();
        this.props.login(this.state);
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
                                <button className="button primary" type="submit" disabled={this.props.flag===1?true:false}>Login</button>
                            </li>
                        </ul>
                    </form>
                    <div className="kya">
                        <p >Dont have an Account <span><a href="/signup">SignUp</a></span></p>
                    </div>
                    </main>
            </div>
        )
    }
}

export default Login
