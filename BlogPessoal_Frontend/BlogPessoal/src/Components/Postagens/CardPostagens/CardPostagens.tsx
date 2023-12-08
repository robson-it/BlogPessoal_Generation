import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { AuthContext } from '../../../contexts/AuthContext' 
import { useContext} from 'react'

interface CardPostagensProps {
    post: Postagem
}

function CardPostagens({ post }: CardPostagensProps) {
    const { usuario } = useContext(AuthContext)

    return (
        <div className=' shadow shadow-paleta4 shadow-lg 
            flex flex-col rounded overflow-hidden justify-between bg-paleta1 text-paleta4'>

            <div>
                <div className="flex w-full bg-gradient-to-t from-paleta1 from-50% to-paleta4 to-50% text-paleta1 py-2 px-4 items-top gap-4">
                    <img src={post.usuario?.foto} className='h-12 w-12 rounded-full' 
                        alt="Imagem do Usuário" />
                    <h5 className='text-md font-semibold text-center capitalize mb-8'>{post.usuario?.nome.split(' ').slice(0,1)}</h5>
                </div>
                <div className='p-4 pt-0'>
                    <h4 className='text-lg font-semibold uppercase'>{post.titulo}</h4>
                    <p>{post.texto}</p>
                    <p>Tema: {post.tema?.descricao}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(post.data))}</p>
                </div>
            </div>
            {
                post.usuario?.id === usuario.id && 
            <div className="flex">
                <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-paleta5 
                    hover:bg-paleta6 flex items-center justify-center py-1'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-paleta2 
                    hover:bg-paleta4 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
            }
        </div>
    )
}

export default CardPostagens