import React, { useEffect, useState } from 'react';
import MapView from './components/MapView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [resData, setResData] = useState("")
  const [venues, setVenues] = useState([])

  const fetchData = async () => {
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    await axios.get("http://localhost:4000/french").then(res => {
      setResData(res.data)

      res.data.features.map((key, val) => {
        setVenues(current => [...current, {
          description: key.properties.city,
          name: key.properties.name,
          geometry: [
            key.geometry.coordinates[1],
            key.geometry.coordinates[0]
          ]
        }])
      })
      
    })
  }

  useEffect(() => {
    fetchData();
    

  }, [])

  return (
    <div className="App">
      <div className="container-fluid">
        <div className='row'>
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">

          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={e => {
                      e.preventDefault();
                      console.log(venues)
                    }}
                  >
                    Show map
                  </button>
                </div>

              </div>
            </div>

            <MapView venues={venues}/>


            <h1>Data section</h1>
            <div className='table-responsive'>
              <table className="table table-striped table-sm">
                <tr>
                  <th scope="col">city</th>
                  <th scope="col">housenumber</th>
                  <th scope="col">name</th>
                  <th scope="col">postcode</th>
                  <th scope="col">Longitude</th>
                  <th scope="col">Latitude</th>
                </tr>
                <tbody>
                  {resData.features ? resData.features.map((key, val) => (
                    <tr>
                      <td>{key.properties.city}</td>
                      <td>{key.properties.housenumber}</td>
                      <td>{key.properties.name}</td>
                      <td>{key.properties.postcode}</td>
                      <td>{key.geometry.coordinates[0]}</td>
                      <td>{key.geometry.coordinates[1]}</td>
                    </tr>
                  )) : <></>}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

    </div>
  );
}

export default App;
