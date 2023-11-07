import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {

    const navigate = useNavigate()
    const { handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        alert('Usuário deslogado com sucesso')
        navigate('/login')
    }

    return (
        <>
            <div className='w-full bg-indigo-900 text-white
                flex justify-center py-4'>
                <div className="container flex justify-between text-md">
                    <div className="container flex justify-between text-md">
                        <Link to='/home' className='text-1xl font-bold'>Blog Pessoal</Link>

                        <div className='flex gap-4'>
                            <Link to='/postagens' className='hover:underline'>Postagens</Link>
                            <Link to='/temas' className='hover:underline'>Temas</Link>
                            <Link to='/cadastroTema' className='hover:underline'>Cadastrar Tema</Link>
                            Perfil
                            <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar