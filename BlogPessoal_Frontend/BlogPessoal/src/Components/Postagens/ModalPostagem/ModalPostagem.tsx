import Popup from 'reactjs-popup';
import FormularioPostagem from '../FormularioPostagem/FormularioPostagem';

import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css'

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 bg-paleta4 hover:bg-paleta3 hover:text-white text-white'>
                        Nova Postagem
                    </button>
                }
                modal
            >
                <FormularioPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;