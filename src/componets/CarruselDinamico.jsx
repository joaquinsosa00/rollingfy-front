import { Carousel } from 'react-bootstrap';

const CarruselDinamico = ({ imagenes }) => {
  return (
    <Carousel className='mb-5 shadow-lg rounded-5 overflow-hidden'>
      {imagenes.map((imagen, indice) => (
        <Carousel.Item key={indice}>
          <img
            className="d-block w-100"
            src={imagen.src}
            alt={imagen.alt}
            style={{ height: "auto", objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarruselDinamico;