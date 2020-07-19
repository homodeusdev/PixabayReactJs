import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({setBusqueda}) => {
    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        //validator
        if (termino.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        //Enviar el termino de la busqueda hacia el componente principal
        setBusqueda(termino);
    }

    return ( 
        <form 
            onSubmit={buscarImagenes}
            >
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input 
                        type='text' 
                        className='form-control form-control-lg' 
                        placeholder='Buscar una imagen, ejemplo: futbol o cafe' 
                        onChange={ e => setTermino(e.target.value) }
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input 
                        type='submit' 
                        className='btn btn-lg btn-danger btn-block' 
                        value='buscar'
                    />
                </div>
            </div>
            { error ? <Error mensaje='Agrega un termino de busqueda' /> : null }
        </form>
     );
}
 
export default Formulario;