import { ReactNode, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { House, Newspaper, Notebook, SignOut } from '@phosphor-icons/react'
import { toastAlerta } from '../../utils/toastAlerta'
import ModalPostagem from '../Postagens/ModalPostagem/ModalPostagem'
import ModalTema from '../Temas/ModalTemas/ModalTemas'


function Navbar() {

    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        toastAlerta('Usuário deslogado com sucesso', "sucesso")
        navigate('/login')
    }

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <>
                <div className='w-full bg-paleta4 text-paleta1 flex justify-center pb-2 pt-4 px-4'>
                    <div className=" container flex justify-between text-lg">
                        <Link to='/home' className='text-2xl font-bold'>Trinitas</Link>

                        <Link to='/perfil' className='hover:underline'>
                            <div className="flex relative w-10 h-10 mb-1 mr-24 bg-paleta4 text-paleta1 items-center gap-0 rounded-full">
                                <img src={usuario?.foto} className='h-10 w-10 rounded-full'
                                    alt="Imagem do Usuário" />
                                <h6 className='text-xl text-center ml-3 capitalize'>{usuario?.nome.split(' ').slice(0, 1)}</h6>
                            </div>

                        </Link>

                    </div>
                </div>
                <div className='flex relative bg-gradient-to-t from-paleta1 from-60% to-paleta4 to-40% shadow-md shadow-paleta4 w-58 rounded-b justify-center items-center  text-paleta4'>

                    {location.pathname == '/postagens' &&
                        <ModalPostagem id={0} operacao={'novaPostagem'} />}

                    {location.pathname == '/temas' &&
                        <ModalTema id={0} operacao={'novoTema'} />}


                    <Link to='/home' className='hover:underline'>
                        <div className="text-white justify-center items-center mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 shadow-md hover:bg-editar">
                            <House size={28}></House>
                        </div>
                        <h6 className='text-sm text-center'>Home</h6>
                    </Link>
                    <Link to='/postagens' className='hover:underline'>
                        <div className="text-white justify-center items-center ml-16 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 shadow-md hover:bg-editar">
                            <Newspaper size={28}></Newspaper>
                        </div>
                        <h6 className='text-sm text-center ml-14'>Postagens</h6>
                    </Link>
                    <Link to='/temas' className='hover:underline'>
                        <div className="text-white justify-center items-center ml-16 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 shadow-md hover:bg-editar">
                            <Notebook size={28}></Notebook>
                        </div>
                        <h6 className='text-sm text-center ml-16'>Temas</h6>
                    </Link>
                    <Link to='' onClick={logout} className='hover:underline'>
                        <div className="text-white justify-center items-center ml-16 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 shadow-md hover:bg-editar">
                            <SignOut size={28}></SignOut>
                        </div>
                        <h6 className='text-sm text-center ml-16'>Sair</h6>
                    </Link>
                </div></>
        )

    }

    return (
        <>
            {component}
        </>
    )
}

export default Navbar