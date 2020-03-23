import React from "react";
import loginImg from "../../login.svg";
import "./style.css";
import axios from 'axios';
import {UserManagement} from './user-management';
//import {ApiPost} from './restapi/api-post';

export class Login extends React.Component{

    state = {
        islogg: false,
        email: '',
        password: '',
        id: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        birthday: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    loggin = async (e) => {
        e.preventDefault();

        await axios.post('/api/users/op=auth', this.state)
        .then(response => {
            if(response.status === 200){
                this.setState({id: response.data.ID});
                this.setState({primer_nombre: response.data.PRIMER_NOMBRE});
                this.setState({segundo_nombre: response.data.SEGUNDO_NOMBRE});
                this.setState({primer_apellido: response.data.PRIMER_APELLIDO});
                this.setState({segundo_apellido: response.data.SEGUNDO_APELLIDO});
                this.setState({birthday: response.data.BIRTHDAY});
                this.setState({islogg: true});
            }else{
                alert("No match for the given user/pass");
                this.setState({islogg: false});
            }
        })

        .catch(error => {
            alert('Error with Login. Try later.');
        })

        /*
        //console.log(ApiPost('/api/users/op=auth', this.state));
        await ApiPost('/api/users/op=auth', this.state).then ((result) => {
            console.log(result);
            let responseJSON = result;
            console.log(responseJSON);
        });
        */
        
    }

    render() {
        if(this.state.islogg){
            //Retorno interfaz de usuarios
            return <UserManagement userData={this.state} />

        }else{
            //Retorno formulario de logueo
            return <form onSubmit={this.loggin}>
            <div className="base-container">
                <div className="content">
                    <div className="head">
                    Login
                    </div>

                    <div className="image">
                    <img alt="user-log-img" src={loginImg} />
                    </div>

                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="email" onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passsword">Password</label>
                            <input type="password" name="password" placeholder="password" onChange={this.onChange} />
                        </div>
                    </div>
                    
                    <button className="btn" type="submit" >Login</button>
                </div>
            </div>
        </form>
        }
    }
}