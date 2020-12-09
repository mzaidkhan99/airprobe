import React, { Component } from 'react';

import '../App.css';

class Signin extends Component{

    constructor(props){
        super(props);
        this.state= {
            window:'signin',
            data:this.props.state.data,
            email:'',
            password:''
        };
    }

    render(){
        let error;
        console.log(this.state.email);
        console.log(this.state.password);
        var email = this.props.inputEmail;
        this.state.data.map(da =>{
            if(da.email===email){
                error = "username already exist";
            }
        })

        // console.log(this.state.pass);
        // if (this.state.window == 'signin'){

        return(
            <div className='App-header'>
                <h2>SIGNIN PAGE</h2>
                <div className='error'>{this.error}</div>
                <div className='form'>
                    <form>
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input name="email" onChange={this.props.inputEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        {/* <small id="error" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input name="password" onChange={this.props.inputPass} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button onClick={this.props.loginSubmitHandle} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <small>Don't have an account? <button className="btn btn-primary btn-sm" onClick={this.props.signupHandle}>Click here</button></small>
                </div>
            </div>
        );

    }
}
export default Signin;