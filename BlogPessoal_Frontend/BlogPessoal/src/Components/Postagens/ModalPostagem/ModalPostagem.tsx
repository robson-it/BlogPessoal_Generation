import Popup from 'reactjs-popup';
import FormularioPostagem from '../FormularioPostagem/FormularioPostagem';
import DeletarPostagem from '../DeletarPostagem/DeletarPostagem';
import { ListPlus, XCircle, Trash, NotePencil } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom';

import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css'
import { useEffect, useState } from 'react';


const ModalPostagem = (propriedades: any) => {

    const idModal = propriedades.id
    const operacaoModal = propriedades.operacao
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const location = useLocation();

    useEffect(() => {
        closeModal()
    }, [location.key])

    return (
        <>
            {
                operacaoModal === 'novaPostagem' &&

                <>
                    <p className='hover:underline cursor-pointer' onClick={() => setOpen(o => !o)}>
                        <div className="text-white justify-center items-center lg:mr-16 mr-8 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 hover:bg-editar">
                            <ListPlus size={28} ></ListPlus>
                        </div>

                        <h6 className='text-sm text-center lg:mr-16 mr-8'>Postar</h6>
                    </p>
                </>
            }

            {
                operacaoModal === 'editarPostagem' &&
                <div className='flex justify-center items-center h-10 w-10 rounded-full bg-paleta4 cursor-pointer hover:bg-editar'>
                    <NotePencil size={22}  onClick={() => setOpen(o => !o)} />
                </div>
            }

            {
                operacaoModal === 'deletarPostagem' &&
                <div className='flex justify-center items-center h-10 w-10 rounded-full bg-paleta4 cursor-pointer hover:bg-deletar'>
                    <Trash size={22}  onClick={() => setOpen(o => !o)} />
                </div>
            }

            <Popup
                open={open} onClose={closeModal}

                {...{}}

                modal
            >
                <div className="pl-1 pt-2 container flex justify-end items-center absolute pr-4 text-paleta1 " >
                    <Link to="/postagens" className="close" id="fecharModal" onClick={closeModal}>
                        <XCircle size={28} weight="bold" />
                    </Link>
                </div>

                {
                    operacaoModal === 'novaPostagem' &&
                    <FormularioPostagem />
                }

                {
                    operacaoModal === 'editarPostagem' &&
                    <FormularioPostagem idPostagem={idModal.toString()} />
                }

                {
                    operacaoModal === 'deletarPostagem' &&
                    <DeletarPostagem idPostagem={idModal.toString()} />
                }


            </Popup>
        </>
    );

}

export default ModalPostagem;