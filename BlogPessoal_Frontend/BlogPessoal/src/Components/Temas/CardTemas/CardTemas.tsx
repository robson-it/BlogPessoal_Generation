import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'
import { AuthContext } from '../../../contexts/AuthContext' 
import { useContext} from 'react'

interface CardTemasProps {
    tema: Tema
}

function CardTemas({ tema }: CardTemasProps) {

    const { usuario } = useContext(AuthContext)

    return (
        <div className='shadow shadow-paleta4 shadow-lg  flex flex-col rounded overflow-hidden justify-between'>
            <header className='py-1 px-6 bg-paleta4 text-white font-semibold text-lg'>
                Tema
            </header>

            <p className='p-8 text-xl bg-paleta1 h-full text-paleta4'>
                {tema.descricao}
            </p>
            {
                usuario.usuario === 'root@root.com.br' && 
            <div className="flex text-paleta1">
                <Link to={`/editarTema/${tema.id}`}
                    className='w-full text-slate-100 text-paleta1 hover:text-paleta1 bg-paleta5 hover:bg-paleta6 flex items-center justify-center py-0'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletarTema/${tema.id}`}
                    className='text-slate-100 bg-paleta2 hover:bg-paleta4 w-full 
                        flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
            }
        </div>
    )
}

export default CardTemas