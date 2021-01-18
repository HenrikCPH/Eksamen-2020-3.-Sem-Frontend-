import React, { useState, useEffect } from "react"
import URL, {localURL, dropletURL} from './settings';

function App() {

  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
   }

   function urlFetchSpecContactFromBackend (input) {
    return fetch(dropletURL + "/api/opp/contact/" + input)
    .then(handleHttpErrors)
  }

   function urlFetchContactsFromBackend () {
    return fetch(dropletURL + "/api/opp/contacts")
    .then(handleHttpErrors)
  }

  function ShowApp() { 
    const [contactData, setContactData] = useState([]);
    const [specContactData, setSpecContactData] = useState([]);
    const [inputData, setInputData] = useState([]);

       useEffect(() => {
        urlFetchContactsFromBackend().then(data=> setContactData(data));
       }, [])

       useEffect(() => {
        urlFetchSpecContactFromBackend().then(data=> setSpecContactData(data));
      }, [])

   const handleChange = event => {
    setInputData(event.target.value);
   };
   
   const handleSubmit = (e) => {
     e.preventDefault();
     urlFetchSpecContactFromBackend(inputData);
   }

  const mappedContactData = contactData.map((tag) =>
  <li key={tag.id}>
   Name: {tag.name} -
   status: {tag.status} -
   email: {tag.email} -
   company: {tag.company} -
   jobtitle: {tag.jobtitle} -
   phone: {tag.phone} -
  </li>
  ) 

  const mappedSpecContactData = specContactData.map((tag) =>
  <li key={tag.id}>
   Name: {tag.name} -
   status: {tag.status} -
   email: {tag.email} -
   company: {tag.company} -
   jobtitle: {tag.jobtitle} -
   phone: {tag.phone} -
  </li>
  ) 

  return (
    <div>
      <h2>Overveiw</h2><br></br>
      <h4>Contacts</h4>
        {mappedContactData}
        <h2>Contact by id</h2><br></br>
          <form>
            <input
              value ={inputData}
              placeholder="Enter the contacts id"
              type="text"
              onChange={handleChange}
            /><br></br>
            <button onClick={handleSubmit}>Confirm</button>
            </form>
            {mappedSpecContactData}
    </div>
  );
  }

  return (
    <div>
      {ShowApp()}
    </div>
  );
}                                   

export default App;
 
