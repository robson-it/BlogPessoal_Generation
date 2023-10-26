
import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-md font-bold'>
                            Blog Pessoal Generation | Copyright: {data}
                        </p>
                    <p className='text-md'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <LinkedinLogo size={36} weight='bold' />
                        <InstagramLogo size={36} weight='bold' />
                        <FacebookLogo size={36} weight='bold' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer