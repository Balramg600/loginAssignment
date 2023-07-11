import React, { Component } from "react";
import http from "../services/httpService";
import auth from "../services/authService";

class Login extends Component {
  state = {
    form: { email: '', password: '', password2: '' },
    responseMessage: '',
    view: 0,
    error:'',
  }
  timer = null;

  handleChange = (e) => {
    const { currentTarget: input } = e;
    const s1 = { ...this.state };
    s1.form[input.name] = input.value;
    s1.error='';
    this.setState(s1);

    if(s1.view==0){
        clearTimeout(this.timer);//clear the timer and set again
        this.timer = setTimeout(() => this.login('/login', { email: this.state.form.email, password: this.state.form.password }), 1000);
    }
  }

  async login(url, obj) {
    try {
      const response = await http.post(url, obj);
      const { data } = response;
      console.log(data);
      if (data.message === '1' || data.message === '2') {
        auth.login(obj);
        this.props.history.push('/dashboard');
      } else if (data.message === '3') {
        console.log('3');
        this.setState({ responseMessage: '3' });
      } else if (data.message === '4') {
        console.log('4');
        this.setState({ responseMessage: '4' });
      }
      else if(data.message=='5'){
        this.setState({error:'Wrong Password'})
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        let errors = {};
        console.log(ex.response.data);
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let s1={...this.state}
    if(s1.form.password===s1.form.password2){
        this.login(`/login`, { email: this.state.form.email, password: this.state.form.password });
    }
    else{
        alert('passwords must be same');
    }
  }

  handleView = (n) => {
    this.setState({ view: n, responseMessage: '4' });
  }

  render() {
    const { form, responseMessage, view, error} = this.state;
    const { email, password, password2 } = form;

    return (
      <div className="container">
        <h4 className="text-center">Login</h4><br />
        <div className="text-center row">
          <div className="col-2"></div>
          <div className="col-3">
            <label className="form-group text-center">Email</label>
          </div>
          <div className="col-5">
            <input type="text" className="form-control m-1 form-group-inline" id="email" name="email" value={email} placeholder="Enter email" onChange={this.handleChange} />
          </div>
          <div className="col-2"></div>
        </div>
        {(responseMessage === '4' && view !== 1) && (
          <div className="row">
            <div className="col-2"></div>
            <div className="col-3"></div>
            <div className="col-5 text-primary text-decoration-underline" onClick={() => this.handleView(1)}>Create new Account</div>
            <div className="col-2"></div>
          </div>
        )}
        <br />
        {(responseMessage === '3' || ((responseMessage === '4') && (view==1))) && (
          <div className="text-center row">
            <div className="col-2"></div>
            <div className="col-3">
              <label className="form-group text-center">Password</label>
            </div>
            <div className="col-5">
              <input type="password" className="form-control m-1" id="password" name="password" value={password} placeholder="Enter Password" onChange={this.handleChange} />
            </div>
            <div className="col-2"></div>
          </div>
        )}

        <div className="row">
            <div className="col-2"></div>
            <div className="col-3"></div>
            <div className="col-5 text-danger">{error}</div>
            <div className="col-2"></div>
          </div>

        {(responseMessage === '4' && view === 1) && (
          <div className="text-center row">
            <div className="col-2"></div>
            <div className="col-3">
              <label className="form-group text-center">Re-Enter</label>
            </div>
            <div className="col-5">
              <input type="password" className="form-control m-1" id="password2" name="password2" value={password2} placeholder="Re-Enter Password" onChange={this.handleChange} />
            </div>
            <div className="col-2"></div>
          </div>
        )}

        {(responseMessage === '4' && view === 1) && (
          <div className="row">
            <div className="col-5"></div>
            <button className="btn btn-primary m-2 col-2" onClick={this.handleSubmit}>Login</button>
            <div className="col-5"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
