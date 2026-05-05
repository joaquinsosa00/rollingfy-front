import React from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { cancionesIniciales } from '../helpers/DatosInicio'
import GrillaReproductores from '../componets/GrillaReproductores'

import CarruselDinamico from '../componets/CarruselDinamico'; 

const imagenesExtraidas = import.meta.glob('../assets/imagenesCarrousel/*.{jpg,jpeg,png,webp}', { 
  eager: true, 
  import: 'default' 
});


const listaImagenes = Object.values(imagenesExtraidas).map((urlImagen, indice) => ({
  src: urlImagen,
  alt: `Slide ${indice + 1}`
}));

const Home = () => {
  return (
    <>
      <div className='bg-black text-white min-vh-100 py-4'>

        <Container>
          <h3 className='fw-bold mb-4'>Proximos recitales en Tucumán</h3>
          {listaImagenes.length > 0 ? (
            <CarruselDinamico imagenes={listaImagenes} />
          ) : (
            <p className="text-center text-muted">No se encontraron imágenes en la carpeta.</p>
          )}
        </Container>

        <GrillaReproductores />
      </div >
    </>
  )
}

export default Home


