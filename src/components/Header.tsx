import { useMemo } from "react"
import type { CartItem  } from "../types"
import type { CartActions } from "../reducers/cart-reducer"
import { currencyFormatter } from "../functions/priceFormater"


type HeaderProps = {
    cart: CartItem[],
    dispatch: React.Dispatch<CartActions>
    
}

const Header = ({cart,dispatch } :
    HeaderProps) => {
    
    const pesoChileno = (value : number) => {
        
        const pesoPrice = currencyFormatter({currency:"CLP", value})
        return pesoPrice
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce( (total : number, item : CartItem) => total + (item.quantity * item.price) , 0), [cart])

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((guitar) => (

                                            
                                            <tr key={guitar.id}>
                                                <td>
                                                    <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                </td>
                                                <td>{guitar.name}</td>
                                                <td className="fw-bold">
                                                        ${pesoChileno(guitar.price)}
                                                </td>
                                                <td className="flex align-items-start gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => dispatch({type: 'decrease-quantity' , payload: {id: guitar.id}})}
                                                    >
                                                        -
                                                    </button>
                                                        {guitar.quantity}
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => dispatch({type: 'increase-quantity' , payload: {id: guitar.id}})}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={() => dispatch({type: 'remove-from-cart', payload: {id:guitar.id} })}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total pagar: <span className="fw-bold">${pesoChileno(cartTotal)}</span></p>
                                    <button className="btn btn-dark w-100 mt-3 p-2" onClick={()=> dispatch({type: 'clear-cart'})}>Vaciar Carrito</button>
                                </>
                                
                                )}

                                

                                
                                
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header