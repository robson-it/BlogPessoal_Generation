import { ReactNode, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { House, SignOut } from '@phosphor-icons/react'
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
            <div className='w-full bg-paleta4 text-paleta1 flex justify-center pb-2 pt-4 px-4'>
                <div className=" container flex justify-between text-lg">
                    <Link to='/home' className='text-2xl font-bold'>Trinitas</Link>

                    <div className='flex gap-4'>
                        <Link to='/postagens' className='hover:underline'>Postagens</Link>
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        {/* <Link to='/cadastroTema' className='hover:underline'>Cadastrar Tema</Link> */}
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>

                </div>
            </div>
        )

    }

    return (
        <>
            {component}


            <>
                {
                    location.pathname == '/postagens' &&
                    <div className='flex relative bg-gradient-to-t from-paleta1 from-60% to-paleta4 to-40% shadow-md shadow-paleta4 w-58 rounded-b justify-center items-center  text-paleta4'>
                        <Link to='/perfil' className='hover:underline'>
                            <div className="flex relative w-10 h-10 mb-1 ml-1 bg-paleta4 text-paleta1 items-center gap-0 rounded-full">
                                <img src={usuario?.foto} className='h-10 w-10 rounded-full'
                                    alt="Imagem do Usuário" />
                                {/* <h3 className='text-lg font-bold text-center uppercase'>{usuario?.nome}</h3> */}
                            </div>
                            <h6 className='text-sm text-center ml-1 capitalize'>{usuario?.nome.split(' ').slice(0, 1)}</h6>
                        </Link>


                        <ModalPostagem id={0} operacao={'novaPostagem'} />


                        <Link to='/home' className='hover:underline'>
                            <div className="text-white justify-center items-center ml-12 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 shadow-md hover:bg-editar">
                                <House size={28}></House>
                            </div>
                            <h6 className='text-sm text-center ml-12'>Home</h6>
                        </Link>
                        <Link to='' onClick={logout} className='hover:underline'>
                            <div className="text-white justify-center items-center ml-12 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 shadow-md hover:bg-editar">
                                <SignOut size={28}></SignOut>
                            </div>
                            <h6 className='text-sm text-center ml-12'>Sair</h6>
                        </Link>
                    </div>
                }
            </>


            {
                location.pathname == '/temas' &&
                <>
                    <div className='flex relative bg-gradient-to-t from-paleta1 from-60% to-paleta4 to-40% shadow-md shadow-paleta4 w-58 rounded-b justify-center items-center  text-paleta4'>
                        <Link to='/perfil' className='hover:underline'>
                            <div className="flex relative w-10 h-10 mb-1 ml-1 bg-paleta4 text-paleta1 items-center gap-0 rounded-full">
                                <img src={usuario?.foto} className='h-10 w-10 rounded-full'
                                    alt="Imagem do Usuário" />
                                {/* <h3 className='text-lg font-bold text-center uppercase'>{usuario?.nome}</h3> */}
                            </div>
                            <h6 className='text-sm text-center ml-1 capitalize'>{usuario?.nome.split(' ').slice(0, 1)}</h6>
                        </Link>

                        <ModalTema id={0} operacao={'novoTema'} />

                        <Link to='/home' className='hover:underline'>
                            <div className="text-white justify-center items-center ml-12 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 hover:bg-editar">
                                <House size={28}></House>
                            </div>
                            <h6 className='text-sm text-center ml-12'>Home</h6>
                        </Link>
                        <Link to='' onClick={logout} className='hover:underline'>
                            <div className="text-white justify-center items-center ml-12 mb-1 flex relative w-10 h-10 rounded-full bg-paleta4 hover:bg-editar">
                                <SignOut size={28}></SignOut>
                            </div>
                            <h6 className='text-sm text-center ml-12'>Sair</h6>
                        </Link>
                    </div>
                </>
            }

        </>
    )
}

export default Navbar