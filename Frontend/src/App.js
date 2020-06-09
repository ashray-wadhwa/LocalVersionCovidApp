import React from 'react';
import './App.css';

class Component_one extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      covidinfo: [],
      tempOrganization: "",
      tempDescription: "",
      tempLinks: "",
      delOrganization: "",
      delDescription: "",
      delLinks: "",
      success: true
    }
  }

  // WOULD LIKE TO GET ONLY WHEN THE BUTTON IS PRESSED
  // componentDidMount() {
  //   fetch('/covidInfo')
  //     .then(res => res.json())
  //     .then((covid) => {this.setState({ covidInfo: covid.info }) });
  // }

 nextWindow(){
   fetch('/news')
 }

  getData() {
    fetch('/donate')
      .then(res => res.json())
      .then(covid =>  this.setState({ covidinfo: covid.info}));
  }

  postData(){
    let data =  {Organization: this.state.tempOrganization, Description: this.state.tempDescription, Links: this.state.tempLinks}
    let options ={
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/donate', options);
  }

  putData(){
    let data =  {Organization: this.state.tempOrganization, Description: this.state.tempDescription, Links: this.state.tempLinks}
    let options ={
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/donate', options);
  }

  delData(){
    let data =  {Organization: this.state.delOrganization, Description: this.state.delDescription, Links: this.state.delLinks}
    let options = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/donate', options);
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  //<button onClick={() => { this.getData()}}>Get</button>
  render() {
    return (
      <div className="component_one">
        <h1>Post/Update Records</h1>
        <div>
          Enter Organization:
          <input type="text" name="tempOrganization" value={this.state.tempOrganization} onChange={this.handleChange}></input>
          Enter Description:
          <input type="text" name="tempDescription" value={this.state.tempDescription} onChange={this.handleChange}></input>
          Enter Link:
          <input type="text" name="tempLinks" value={this.state.tempLinks} onChange={this.handleChange}></input>
          <button onClick={() => { this.putData() }}>Update!</button>
          <button onClick={() => { this.postData() }}>Post!</button>
        </div>

        <h1>Delete a Record</h1>
        <div>
          Enter Organization:
          <input type="text" name="delOrganization" value={this.state.delOrganization} onChange={this.handleChange}></input>
          Enter Description:
          <input type="text" name="delDescription" value={this.state.delDescription} onChange={this.handleChange}></input>
          Enter Link:
          <input type="text" name="delLinks" value={this.state.delLinks} onChange={this.handleChange}></input>
          <button onClick={() => { this.delData();}}>Delete!</button>
        </div>

        <h1>Access Records</h1>
        <button onClick={() => { this.getData() }}>Get Data</button>

        <table>
          <tr>
            <th>Organization</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
          
          {this.state.covidinfo.map(
              corona_stats =>
          <tr key = {corona_stats.Organization}>
              <td>{corona_stats.Organization}</td>
              <td>{corona_stats.Description}</td>
              <td>{corona_stats.Links}</td>
            
          </tr>)}
        </table>
        <br/>
        <button onClick={() => {this.nextWindow()}}>Click for Covid Related News and Counters</button>

      </div>
    );
  }
}

export default Component_one;
