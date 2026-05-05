import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const CardCancion = ({cancion}) => {
    return ( 
        <>
       <Card className='bg-dark text-white border-0 h-100 shadow-sm'>
        <Card.Img 
        variant='top'
        src={cancion.imagen} 
        alt={`Portada de ${cancion.nombre}`}
        className='p-2 p-md-3 rounded-4'
        style={{ objectFit: 'cover', aspectRatio: '1/1' }}
        />
        <Card.Body className='d-flex flex-column p-2 p-md-3'>
            <div>
                <Card.Title className='fs-5 fw-bold text-truncate'>{cancion.nombre}</Card.Title>
                <Card.Text className='text-secondary small mb-3 text-truncate'>{cancion.artista}</Card.Text>
            </div>
            <Link to={`/detalle/${cancion.id}`} className="text-decoration-none">
              <Button variant='outline-light' size="sm" className='w-100 rounded-pill fw-bold'>
                Ver Detalle
              </Button>
            
            </Link>
        


        </Card.Body>
       </Card>
        
        </>
    )
}

export default CardCancion 