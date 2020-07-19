import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  //State de la app
  const [busqueda, setBusqueda] = useState('');
  const [images, setImages] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    if (busqueda === '') return;

    const consultarApi = async () => {
      const imagenesPorPagina = 30;
      const key = '17431989-cc33cc6bfe4af1ca8037a7672';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImages(resultado.hits);

      //Calcular el total de totalPaginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);

      //Mover la pagina hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    
    consultarApi();
  }, [busqueda, paginaActual]);

  //Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>
          Buscador de Imagenes
        </p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes 
          imagenes={images}
        />

        {(paginaActual === 1) ? null : (
          <button
            type='button' 
            className='bbtn btn-info mr-1'
            onClick={paginaAnterior}>
            Anterior &laquo;
          </button>
        )}
        
        {(paginaActual === totalPaginas) ? null : (
          <button
            type='button' 
            className='bbtn btn-info'
            onClick={paginaSiguiente}>
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
