import ListaPostagens from "../../Components/Postagens/ListaPostagens/ListaPostagens"
import ModalPostagem from "../../Components/Postagens/ModalPostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="bg-paleta1 flex justify-center ">
                <div className='container grid grid-cols-2 text-paleta4'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='lg:text-5xl text-xl font-bold pl-2'>
                            Seja Bem-Vindo(a)!
                        </h2>
                        <p className='text-md pl-4'>
                            Expresse aqui seus pensamentos e opniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="/livrosPergaminho.png"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </>
    )
}

export default Home