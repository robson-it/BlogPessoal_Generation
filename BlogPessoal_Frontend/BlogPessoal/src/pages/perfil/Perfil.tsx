import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../utils/toastAlerta'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toastAlerta('Você precisa estar logado', "info")
            navigate("/login")
        }
    }, [usuario.token])

    return (
        <div className='container mx-auto mt-4 rounded-xl overflow-hidden shadow-lg shadow shadow-paleta4 mb-4'>

            <img 
                className='w-full h-72 object-cover border-b-8 border-white' 
                src="https://media.licdn.com/dms/image/D4D12AQGXX_D-z2g71w/article-cover_image-shrink_720_1280/0/1668427221036?e=2147483647&v=beta&t=sDiTr5-15JanwO8fd0SsBPCLTpAsC93sbz-mYgQwLeo" alt="Capa do Perfil" />

            <img 
                className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

            <div 
                className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-paleta4 text-paleta1 text-2xl items-center justify-center "
            >
                <p>Nome: {usuario.nome} </p>
                <p>Email: {usuario.usuario}</p>
            </div>

        </div>
    )
}

export default Perfil