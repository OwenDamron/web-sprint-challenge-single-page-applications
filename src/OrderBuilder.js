import React from 'react'

export default function OrderBuilder(props) {
    
    const {values, submit, change, disabled, errors} = props

    const onChange = evt => {
        const {name, type, value, checked} = props
        const inputValue = type === "checkbox" ? checked : value
        change(name, inputValue)

    }

    const onSubmit = evt => {
        evt.preventDefault(
            submit()
        )
    }

    return (
        <form className='pizza-form' onSubmit={onSubmit}>
            <div className='submit'>
                <h2>Build Your Pizza</h2>
                <button className='order-button' disabled={disabled}>Add to Order</button>

                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.size}</div>
                    <div>{errors.special}</div>
                </div>
            </div>

            <div className='pizza-options'>
                <h3>My Order:</h3>

                <label>
                    Name
                    <input value={values.name} onChange={onChange} name='name-input' type='text'/>
                </label>

                <label>
                    Size
                    <input value={values.size} onChange={onChange} name='size-dropdown' type='dropdown'/>
                </label>

                <label>
                    Extra Chs
                    <input value={values.topping1} onChange={onChange} name='topping1' type='checkbox'/>
                </label>

                <label>
                    Pepperoni
                    <input value={values.topping2} onChange={onChange} name='topping2' type='checkbox'/>
                </label>

                <label>
                    Special Instructions
                    <input value={values.special} onChange={onChange} name='special-text' type='text'/>
                </label>
            </div>
        </form>
    )
}