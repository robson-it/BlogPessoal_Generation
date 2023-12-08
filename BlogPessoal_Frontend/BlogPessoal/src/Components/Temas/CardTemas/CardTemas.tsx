import Tema from '../../../models/Tema'
import { AuthContext } from '../../../contexts/AuthContext'
import { useContext } from 'react'
import ModalTema from '../ModalTemas/ModalTemas'

interface CardTemasProps {
    tema: Tema
}

function CardTemas({ tema }: CardTemasProps) {

    const { usuario } = useContext(AuthContext)

    return (
        <div className='shadow shadow-paleta4 shadow-lg  flex flex-col rounded overflow-hidden justify-between'>
            <div className="flex w-full bg-gradient-to-t from-paleta1 from-50% to-paleta4 to-50% text-paleta1 py-2 px-4 items-top gap-4 justify-between">
                <div className='flex'>

                    <p className='text-md ml-4 font-semibold text-center capitalize mb-8'>Tema</p>

                </div>
                {
                    usuario.usuario === 'root@root.com.br' &&
                    <div className='flex gap-4'>

                        <ModalTema id={tema.id} operacao={'editarTema'} />
                        <ModalTema id={tema.id} operacao={'deletarTema'} />

                    </div>
                }
            </div>

            <p className='p-8 pt-0 text-xl bg-paleta1 h-full text-paleta4'>
                {tema.descricao}
            </p>
           
        </div>
    )
}

export default CardTemas