import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner"

import { buscar, deletar } from '../../../services/Service'
import { AuthContext } from '../../../contexts/AuthContext'

import Postagem from '../../../models/Postagem'
import { toastAlerta } from '../../../utils/toastAlerta'

function DeletarPostagem(props: {idPostagem?: string}) {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    // const { id } = useParams<{ id: string }>()
    const id = props.idPostagem

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente',"info")
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', "info")
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/deletar/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Postagem apagada com sucesso', "sucesso")

        } catch (error) {
            toastAlerta('Erro ao apagar a Postagem', "erro")
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }

    return (

        <div className='container w-full mx-auto p-0 rounded-md bg-paleta1 text-paleta4'>
            <h1 className='text-2xl text-center mb-4 pb-2 bg-paleta4 text-paleta1 w-full rounded-t-md'>Deletar Postagem</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='border flex flex-col rounded-md overflow-hidden justify-between mb-2'>
                <header className='py-2 px-6 bg-paleta4 text-paleta1 font-semibold text-xl'>
                    Postagem
                </header>
                <hr></hr>
                <div className="p-4">
                    <p className='text-xl h-full'>{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-paleta4 text-white hover:bg-editar w-full py-1'
                        onClick={retornar}>
                        Não
                    </button>

                    <button
                        className='w-full text-slate-100 bg-paleta2 text-white 
                        hover:bg-deletar flex items-center justify-center'
                        onClick={deletarPostagem}>

                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )

}

export default DeletarPostagem