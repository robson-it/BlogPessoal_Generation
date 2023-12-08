import Popup from 'reactjs-popup';
import FormularioTema from '../FormularioTema/FormularioTema';
import DeletarTema from '../DeletarTema/DeletarTema';
import { ListPlus, XCircle, Trash, NotePencil } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom';

import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from 'react';



const ModalTema = (propriedades: any) => {

    const idModal = propriedades.id
    const operacaoModal = propriedades.operacao
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(() => {
        //console.log('fechando o modal - useEffect')
        closeModal()
    }, [location.key])

    return (
        <>
            {
                operacaoModal == 'novoTema' &&
                <p className='hover:underline cursor-pointer' onClick={() => setOpen(o => !o)}>
                    <div className="text-white justify-center items-center ml-12 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4">
                        <ListPlus size={28} ></ListPlus>
                    </div>

                    <h6 className='text-sm text-center ml-12'>Novo</h6>
                </p>
            }

            {
                operacaoModal == 'editarTema' &&
                <div className='flex justify-center items-center h-10 w-10 rounded-full bg-paleta4 cursor-pointer hover:bg-editar'>
                    <NotePencil size={22}  onClick={() => setOpen(o => !o)} />
                </div>
            }

            {
                operacaoModal == 'deletarTema' &&
                <div className='flex justify-center items-center h-10 w-10 rounded-full bg-paleta4 cursor-pointer hover:bg-deletar'>
                    <Trash size={22}  onClick={() => setOpen(o => !o)} />
                </div>
            }

            <Popup
                open={open} onClose={closeModal}

                {...{}}

                modal
            >
                <div className="pl-1 pt-1 container flex justify-end items-center absolute pr-4 text-white " >
                    <Link to="" className="close" id="fecharModal" onClick={closeModal}>
                        <XCircle size={28} weight="bold" />
                    </Link>
                </div>

                {
                    operacaoModal == 'novoTema' &&
                    <FormularioTema />
                }

                {
                    operacaoModal == 'editarTema' &&
                    <FormularioTema idTema={idModal.toString()} />
                }

                {
                    operacaoModal == 'deletarTema' &&
                    <DeletarTema idTema={idModal.toString()} />
                }


            </Popup>
        </>
    );

}

export default ModalTema;