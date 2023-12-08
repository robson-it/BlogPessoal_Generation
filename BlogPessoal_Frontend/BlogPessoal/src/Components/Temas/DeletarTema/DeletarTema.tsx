import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner";

import { buscar, deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { toastAlerta } from "../../../utils/toastAlerta";

import Tema from "../../../models/Tema";

function DeletarTema(props: {idTema?: string}) {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tema, setTema] = useState<Tema>({} as Tema)

    // const { id } = useParams<{ id: string }>()
    const id = props.idTema

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', "info")
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

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/deletar/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Tema apagado com sucesso', "sucesso")

        } catch (error) {
            toastAlerta('Erro ao apagar o Tema', "erro")
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

    return (
        <div className='container w-full p-0 mx-auto'>
            <h1 className='text-2xl text-center rounded-t-md mb-2 pb-2 bg-paleta4 text-paleta1'>Deletar Tema</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className='border flex flex-col rounded-md overflow-hidden justify-between mb-2'>
                <header className='py-2 px-6 bg-paleta4 text-paleta1 font-semibold text-xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>

                <div className="flex ">

                    <button
                        className='text-slate-100 bg-paleta4 text-white hover:bg-editar w-full py-1'
                        onClick={retornar}>
                        Não
                    </button>

                    <button
                        className='w-full text-slate-100 bg-paleta2 text-white hover:bg-deletar 
                            flex items-center justify-center'
                        onClick={deletarTema}>

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
export default DeletarTema