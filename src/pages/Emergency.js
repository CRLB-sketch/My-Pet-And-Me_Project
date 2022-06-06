/**#######################################################################################
 * Universidad del Valle de Guatemala
 * Departamento de Ciencias de la Computación
 * Ingeniería de Software 1 - Sección 10
 * 
 * Me Pet & Me
 * ! Emergency: Mostrar mapa y solicitar que se atienda a la mascota
 * 
 * Integrantes:
 * Cristian Laynez
 * Elean Rivas
 * Sara Paguaga
 * Diego Ruiz
 * Javier Alvarez
 #######################################################################################*/

import React, { useState } from 'react'

import '../styles/map.css'

import MapComponent from './components/MapComponent'
import Popup from './Popup'

import GetVets from './functions/GetVets'

const Emergency = () => {
  const [vets, setVets] = useState([])
  const [selectedVet, setSelectedVet] = useState({
    name: 'N/A',
    direction: 'N/A',
    phone: 'N/A',
  })
  const [loaded, setLoaded] = useState(false)
  const [seePopup, setSeePopup] = useState(false)

  React.useEffect(() => {
    ;(async () => {
      const data = await GetVets()
      if (!data['success']) {
        alert(data['error'])
      } else {
        setVets(data['data'])
        setLoaded(true)
      }
    })()
  }, [])

  const SeeMaps = ({}) => {
    return (
      <>
        <meta
          name="viewport"
          content="initial-scale=1,maximum-scale=1,user-scalable=no"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
        <>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <div
            className={
              selectedVet['name'] !== 'N/A' ? 'mapNpopDiv' : 'mapNpopDiv2'
            }
          >
            <div
              className={
                selectedVet['name'] !== 'N/A' ? 'mapNpopWrap' : 'mapNpopWrap2'
              }
            >
              {selectedVet['name'] !== 'N/A' && (
                <div class="displayInfo">
                  <h2>Información</h2>
                  <div class="vetInfo">
                    <h4>
                      Nombre: <p>{selectedVet['name']}</p>
                    </h4>
                    <h4>
                      Dirección: <p>{selectedVet['direction']}</p>
                    </h4>
                    <h4>
                      Número de teléfono: <p>{selectedVet['phone']}</p>
                    </h4>
                  </div>
                  <button class="emmBtn" onClick={() => setSeePopup(true)}>
                    Ver Más Detalles
                  </button>
                  
                  <a className='emmBtn2' href='https://www.waze.com/ul?ll=14.611732%2C-90.482656&navigate=yes&zoom=17'> Ir</a>
                  
                  
                </div>
              )}
              <div
                className={
                  selectedVet['name'] !== 'N/A'
                    ? 'displayMap'
                    : 'displayMap-ext'
                }
              >
                <div
                  className={
                    selectedVet['name'] !== 'N/A'
                      ? 'map-container'
                      : 'map-container-ext'
                  }
                >
                  {!loaded && <h1>Cargando...</h1>}
                  {loaded && (
                    <MapComponent vets={vets} setSelectedVet={setSelectedVet} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    )
  }

  return (
    <>
      {!seePopup && <SeeMaps />}
      {seePopup && <Popup vet={selectedVet} regretOriginal={setSeePopup} />}
    </>
  )
}

export default Emergency
