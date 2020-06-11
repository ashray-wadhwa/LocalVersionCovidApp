import React from 'react';
import './App.css';

    // "start": "concurrently \"cd Backend && npm start\" \"cd Frontend && npm start\"",
      // "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix Frontend && npm run build --prefix Frontend"

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
  componentDidMount() {
    fetch('/donate')
      .then(res => res.json())
      .then((covid) => {this.setState({ covidinfo: covid.info }) });
  }

 nextWindow(){
   window.location.replace(
     "http://0.0.0.0:5000/news"
   );
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

  // putData(){
  //   let data =  {Organization: this.state.tempOrganization, Description: this.state.tempDescription, Links: this.state.tempLinks}
  //   let options ={
  //     method: 'put',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }
  //   fetch('/donate', options);
  // }

  // delData(){
  //   let data =  {Organization: this.state.delOrganization, Description: this.state.delDescription, Links: this.state.delLinks}
  //   let options = {
  //     method: 'delete',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }
  //   fetch('/donate', options);
  // }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  //<button onClick={() => { this.getData()}}>Get</button>
  render() {
    return (
      <div className="component_one">
        <img id="coronaImage" src= "http://pngimg.com/uploads/stop_coronavirus/stop_coronavirus_PNG30.png" alt="Image not found"/>
        <h1 class = "donationTitle">Ways to Help During this Pandemic</h1>
        
        <h2>Major Organizations to Donate To</h2>
         <hr></hr>
        <div>
        <h5 class = "userWarning">The Following Information Has Been Extracted From a Washington Post Article written by Kanyakrit Vongkiatkajorn and Laura Daily</h5>
          <table class = "myTable">
            <tr class = "tableHeaders">
              <th>Organization Name</th>
              <th id = "descriptionCol">Description</th>
              <th>Donation Link</th>
            </tr>
            <tr>
              <td>CDC Foundation</td>
              <td>Supports the critical health protection work of the Centers for Disease Control and Prevention. <br/> It is raising emergency response funds to enable the CDC to respond to covid-19.</td>
              <td><a href = "https://give.cdcfoundation.org/give/269833/#!/donation/checkout">DONATE HERE</a></td>
            </tr>
            <tr>
              <td>Center for Disaster Philanthropy Covid-19 Response Fund</td>
              <td>Supports nonprofit organizations working in areas identified as having high numbers of affected individuals <br/> and those working with the most vulnerable populations.</td>
              <td><a href = "https://disasterphilanthropy.org/donate-to-the-cdp-covid-19-response-fund/">DONATE HERE</a></td>
            </tr>
            <tr>
              <td>Direct Relief</td>
              <td>Works in the United States and internationally to equip doctors and nurses with lifesaving medical resources.<br/> The organization is delivering protective masks, exam gloves and isolation gowns to health-care organizations in areas with confirmed covid-19 cases. </td>
              <td><a href = "https://www.directrelief.org/">DONATE HERE</a></td>
            </tr>
            <tr>
              <td>Feeding America</td>
              <td>This organization has a nationwide network of 200 food banks and 60,000 food pantries. Donations to its covid-19 response fund will help food banks across the country support the most vulnerable communities affected by the pandemic.</td>
              <td><a href = "https://www.feedingamerica.org/">DONATE HERE</a></td>
            </tr>
            <tr>
              <td>No Kid Hungry</td>
              <td>This organization deploys funds to ensure that access to free meals continues for children in need, especially with schools closed.  
                It is providing $5 million in emergency grants immediately — with more to come — to help schools and community groups feed kids during the outbreak and making sure families know how to find meals while schools are closed.</td>
              <td><a href = "https://secure.nokidhungry.org/site/Donation2?17586.donation=form1&df_id=17586&mfc_pref=T">DONATE HERE</a></td>
            </tr>
            <tr>
              <td>American Red Cross</td>
              <td>The cancellation of blood drives during this pandemic has resulted in the American Red Cross facing a severe blood shortage.
              Healthy individuals are needed to donate now to maintain a sufficient supply.</td>
              <td><a href = "https://www.redcrossblood.org/give.html/find-drive">DONATE HERE</a></td>
            </tr>
          </table>
  
          </div>
          <hr class = "lineTag"></hr>
          <hr class = "lineTag"></hr>
        <div>
          <h2>User Suggested Organizations</h2>
          <h5 class = "userWarning">The Following Information Has Been Entered By Other Users. 
            Kindly Do Your Own Research Before Visiting These Links</h5>
        </div>
        <table class = "myTable">
          <tr class = "tableHeaders">
            <th>Organization Name</th>
            <th id="descriptionCol">Description</th>
            <th>Donation Link</th>
          </tr>
          {this.state.covidinfo.map(
              corona_stats =>
          <tr key = {corona_stats.Organization}>
              <td>{corona_stats.Organization}</td>
              <td>{corona_stats.Description}</td>
              <td><a href = {corona_stats.Links}>DONATE HERE</a></td>
            
          </tr>)}
        </table>
        <br/>
        <hr class = "lineTag"></hr>
          <hr class = "lineTag"></hr>
        <h2>Suggest an Additional Organization Here</h2>
        <div>
        <hr></hr>
          Enter Organization:
          <br/>
          <textarea name="tempOrganization" value={this.state.tempOrganization} onChange={this.handleChange} required></textarea><br/>
          Enter Description:
          <br/>
          <textarea name="tempDescription" rows="4" cols="50" value={this.state.tempDescription} onChange={this.handleChange} required></textarea><br/>
          Enter Link:
          <br/>
          <textarea name="tempLinks" cols="50" value={this.state.tempLinks} onChange={this.handleChange} required></textarea><br/>
          {/* <button onClick={() => { this.putData() }}>Update!</button> */}


          <button onClick={() => { this.postData(); this.getData() }}> ADD!</button>
          <hr></hr>
        </div>

        {/* <h1>Delete a Record</h1>
        <div>
          Enter Organization:
          <input type="text" name="delOrganization" value={this.state.delOrganization} onChange={this.handleChange}></input>
          Enter Description:
          <input type="text" name="delDescription" value={this.state.delDescription} onChange={this.handleChange}></input>
          Enter Link:
          <input type="text" name="delLinks" value={this.state.delLinks} onChange={this.handleChange}></input>
          <button onClick={() => { this.delData();}}>Delete!</button>
        </div> */}
        {/* <br /> */}

        {/* <h5>PRESS THE BUTTON BELOW AFTER YOU HAVE ADDED AN ORGANIZATION OF CHOICE</h5>
        { this.getData() }*/}
        {/* <button onClick={() => { this.getData() }}>GET!</button>  */}

        <button id = "button" onClick={() => {this.nextWindow()}}>Click for Covid Related News and Updates</button>
      </div>
    );
  }
}

export default Component_one;
