import React, {useState, useEffect} from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import * as yup from 'yup'
import OrderBuilder from './OrderBuilder'
import OrderInfo from './Order'


const initialFormValues = {
  name: '',
  size: '',
  topping1: false,
  topping2: false,
  special: '',
}

const initialFormErrors = {
  name: '',
  size: '',
  special: '',
}

const OrderArray = []
const Disabled = true

function App() {

  const [orders, setOrders] = useState(OrderArray)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(Disabled)

  const addNewOrder = (newOrder) => {
    axios.post('https://reqres.in/api/orders', newOrder)
    .then(({data}) => setOrders([data, ...orders]))
    .catch(err => console.log('Error adding order:', err))
  }

  const input = (name, value) => {
    yup.reach(Error, name)
    .validate(value)
    .then(() => setFormErrors({
      ...formErrors,
      [name]: ''
    }))
    .catch(err => setFormErrors({
      ...formErrors,
      [name]: err.errors[0]
    }))
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const submitOrder = () => {
    const topping1 = []
    const topping2 = []
    Object.keys(formValues)
    .filter(key => key === 'I have chosen my toppings')
    .forEach(key => {
      const value = formValues[key]
      if(value) {
        topping1.push(key)
        topping2.push(key)
      }
    })
    
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      topping1,
      topping2,
      special: formValues.special.trim(),
    }
    addNewOrder(newOrder)
    setFormValues(initialFormValues)
  }

  useEffect(() => {
    Error.isValid(formValues)
    .then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <nav>
      <h1>Lambda Eats</h1>
      <div className='order-pizza'>
        <Link to="/">Home</Link>
        <Link to="/pizza">Order Pizza</Link>
      </div>
      </nav>
      
      <Switch>

        <Route exact path="/">
          Home
        </Route>

      <Route path="/pizza">
        <OrderBuilder change={input} disable={disabled} values={formValues} errors={formErrors} submit={submitOrder} />
      </Route>

      </Switch>

      {
      orders.map((user, parameter) => {
        return(<OrderInfo details={user} key={parameter} />)
      })
      }
    </div>
  );
};
export default App;
