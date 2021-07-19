export default function OrderInfo({details}) {
    if(!details) {
        return <h4>Trying to obtain your order...</h4>
    }

    return (
        <div className='new-order'>
            <h3>{details.name}</h3>
            <p>Size: {details.size}</p>
            <p>Special Instructions: {details.special}</p>
        </div>
    )
}