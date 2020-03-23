import React, { Component } from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './style.css';

export class UserManagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            
            columnDefs:[
                {headerName: 'Primer Nombre', field: 'PRIMER_NOMBRE'},
                {headerName: 'Apellido1', field: 'PRIMER_APELLIDO'},
                {headerName: 'Apellido2', field: 'SEGUNDO_APELLIDO'},
                {headerName: 'BirthDay', field: 'BIRTHDAY'},
                {headerName: 'Email', field: 'EMAIL'}
            ],
            rowData: [
                {PRIMER_NOMBRE: 'Cristian', PRIMER_APELLIDO: 'Taruman', SEGUNDO_APELLIDO: 'Betancourt', BIRTHDAY: '06-09-1992', EMAIL: 'cris.taruman@gmail.com'}
            ],
            lang: 'ESP'
        };

        this.handleChange = this.handleChange.bind(this);
    }
    
    
    async componentDidMount(){
        //fetch('https://api.myjson.com/bins/15psn9')
        //await axios.get('https://api.myjson.com/bins/15psn9')
        await axios.get('/api/users/')
        .then(res => {
            var array = [];
            for(var i=0;i<=res.data.length;i++){
                array.push(res.data[i]);
            }
            this.setState({rowData: array});
        })
        .catch(err => console.log(err));
    }

    //logout = (e) => {
        //this.setState({redirect: true});
    //}

    handleChange(event){
        //console.log(event.target.value);
        this.setState({lang: event.target.value});
        //console.log(event.target.value);
        //console.log(this.state.lang);
    }

    render(){
        return (<div className="base-container">
            <div className="logout">
                <div className="form-group">
                    <div className="lang-group">
                        <label htmlFor="cmb_lang">{ this.state.lang === 'ESP' ? 'Idioma: ': 'Language: ' } </label>
                        <select value={this.state.lang} name="cmb_lang" onChange={this.handleChange}>
                            <option value="ESP">Español</option>
                            <option value="ENG">English</option>
                        </select>
                    </div>

                    <div className="logout-group">
                        <form>
                            <button type="submit" >logout</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="header">
                <p> { this.state.lang === 'ESP' ? 'Bienvenido: ': 'Welcome: ' } {this.props.userData.primer_nombre+' '+this.props.userData.segundo_nombre+' '+this.props.userData.primer_apellido+' '+this.props.userData.segundo_apellido}</p>
    <p> { this.state.lang === 'ESP' ? 'Fecha Nacimiento:': 'Birthday: ' } {this.props.userData.birthday} { this.state.lang === 'ESP' ? 'Correo: ': 'Email: ' } {this.props.userData.email}</p>
            </div>
            <div className="content">
                <div className="ag-theme-balham" style={{width: 1015, height: 300}}>
                    <AgGridReact 
                        columnDefs={this.state.columnDefs} 
                        rowData={this.state.rowData} 
                    />
                </div>
            </div>
            <div className="footer"></div>
            <p> { this.state.lang === 'ESP' ? 'Formulario construido por Cristian Taruman' : 'Form made by Cristian Taruman' } </p>
        </div>
        )
    }
}

export default UserManagement;