import * as yup from 'yup'

export default yup.object().shape({
name: yup.string().min(2, "name must be at least 2 characters").required("name is required!"),
})