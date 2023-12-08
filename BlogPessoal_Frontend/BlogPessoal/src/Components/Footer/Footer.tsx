import { ReactNode, useContext } from 'react'
import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <div className="flex justify-center bg-paleta4 text-paleta1">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                        Blog Pessoal Generation | Copyright: { data }
                    </p>

                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/robson-it/" target="_blank" rel="noopener noreferrer">
                            <LinkedinLogo size={36} weight='bold' /></a>
                        <a href="https://www.instagram.com/robsonmtb94/" target="_blank" rel="noopener noreferrer">
                            <InstagramLogo size={36} weight='bold' /></a>
                        <a href="https://github.com/robson-it" target="_blank" rel="noopener noreferrer">
                            <GithubLogo size={36} weight='bold' /></a>
                    </div>
                </div>
            </div>)
    }

    return (
        <>
            { component }
        </>
    )
}

export default Footer