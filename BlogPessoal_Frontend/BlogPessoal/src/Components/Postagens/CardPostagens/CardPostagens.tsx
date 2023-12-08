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
                <div className="flex w-full bg-paleta4 text-paleta1 py-2 px-4 items-center gap-4">
                    <img src={post.usuario?.foto} className='h-12 rounded-full' 
                        alt="Imagem do Usuário" />
                    <h3 className='text-lg font-bold text-center uppercase'>{post.usuario?.nome}</h3>
                </div>
                <div className='p-4'>
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
                <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-paleta2 
                    hover:bg-paleta4 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-paleta3 
                    hover:bg-paleta4 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
            }
        </div>
    )
}

export default CardPostagens