import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import '../App.css';
import Dashboard from './Dashboard';
// import Signin from './Signin';
// import Signup from './Signup';

class Home extends Component{

    constructor(props){
        super(props);
        this.state= {
            window:'signin',
            data:[],
            email:'',
            password:'',
            message:''
        };
    }

    inputEmail = (e)=>{
        let email = e.target.value;
        this.setState({email:email});
        // if(email ===""){
        //     this.setState({message:"email cannot be left blank"});
        // }
    }
    inputPass = (e)=>{
        this.setState({password:e.target.value});
    }
    checkHandle = (e)=>{
        let target = e.target.name;
        console.log(target);
        // let email = e.target.value;
        // `this.state.${target}`;
        if(target==="email" && this.state.email ===""){
            this.setState({message:`${target} cannot be left blank`});
        } else if(target==="password" && this.state.password ===""){
            this.setState({message:`${target} cannot be left blank`});
        } else{
            this.setState({message:""});
        }
    }
    loginSubmitHandle = (e) => {
        console.log("clicked");
        e.preventDefault();
        let email = this.state.email;
        let pass = this.state.password;
        
        if(this.state.data.length === 0){
            // console.log("no data in the database");
            this.setState({message:"No data in the database. First signup"})
        } else{
            this.state.data.map(da =>{
                if(da.email === email && da.pass === pass){
                    console.log("passed");
                    this.setState({window:'dashboard'});
                } else{
                    console.log("failed");
                    this.setState({message:"Invalid credentials :(  Try again"})
                }
            })
        }        
    }
    signupSubmitHandle = (e)=>{
        e.preventDefault();
        console.log("clicked");
        let email = this.state.email;
        let pass = this.state.password;
        let i=0;
        console.log(email, pass);
        
        if (this.state.data.length > 0){
            this.state.data.map(da=>{
                if(da.email === email){
                    i=i+1;
                }
            }) 
            if(i===0){
                let user = {
                    "email":this.state.email,
                    "pass":this.state.password
                } 
                this.state.data.push(user);
                console.log("data entered");
                console.log(this.state.data);
                this.setState({message:"successfully created acount"});
            } else{

                console.log('duplicate entry');
                this.setState({message:"email already exist"});
                console.log(this.state.data);
            }

        } 
        if (this.state.data.length === 0){
            let user = {
                "email":this.state.email,
                "pass":this.state.password
            } 
            this.state.data.push(user);
            console.log(this.state.data);
            this.setState({message:"successfully created acount"});
        }
    }
    // signupSubmitHandle = () =>{
    //     const email = this.state.email;
    //     const pass = this.state.password;
    //     localStorage.setItem('email',email);
    //     localStorage.setItem('pass',pass);
    // }
    signupHandle = () => {
        this.setState({
            window:'signup'
        });
    }
    loginHandle = () => {
        this.setState({
            message:'',
            window:'signin'
        });
    }
    logoutHandle =() =>{
        this.setState({
            window:'signin',
            message:""
        })
    }

    render(){
        console.log(this.state.email);
        console.log(this.state.password);

        if(this.state.window === "signin"){
            return (
                <div className='App-header'>
                <h2>LOGIN PAGE</h2>
                <div className='form'>
                    <form>
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input name="email" onKeyUp={this.checkHandle} onChange={this.inputEmail} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input name="password" onKeyUp={this.checkHandle} onChange={this.inputPass} type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button onClick={this.loginSubmitHandle} className="btn btn-primary">Login</button>
                    </form>
                    <small>Don't have an account? <button className="btn btn-primary btn-sm" onClick={this.signupHandle}>Signup</button></small>
                </div>
                    <p className="danger">{this.state.message}</p>
            </div>
            )
        } else if(this.state.window === "signup"){
            return (
                <div className='App-header'>
                <h2>SIGNUP PAGE</h2>
                <div className='error'>{this.error}</div>
                <div className='form'>
                    <form>
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input name="email" onKeyUp={this.checkHandle} onChange={this.inputEmail} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                        {/* <small id="error" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input name="password" onKeyUp={this.checkHandle} onChange={this.inputPass} type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button onClick={this.signupSubmitHandle} className="btn btn-primary">Signup</button>
                    </form>
                    <small>Already have an account. <button className="btn btn-primary btn-sm" onClick={this.loginHandle}>Log in</button></small>
                </div>
                    <p className="danger">{this.state.message}</p>
            </div>
            )
        } else if(this.state.window === "dashboard") {
            return (
                <Dashboard
                name = {this.state.email}
                logoutHandle = {this.logoutHandle}
                />
            )
        }

    }
}
export default Home;