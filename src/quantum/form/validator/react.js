/** @jsx React.DOM */
import * as React from "react"

function withValidators(WrappedComponent, skip) {
    return class extends React.Component {

        constructor(props){
            super(props)
            this.state = { isValid: true, model: {}, error: true, errors: {} }
        }

        componentDidMount(){
            this.setError(true)
            this.setErrors({ [this.props.inputOptions.name]: skip ? false : true })
        }

        setModel = (model) => {
            this.setState({ model: {...this.state.model, ...model} })
        }
    
        setError = (error) => {
            this.setState({ error })
        }
    
        setErrors = (errors) => {
            this.setState({ errors: { ...this.state.errors, ...errors } })
    
            let error = false
            for (const key in this.state.errors) {
                if (Object.hasOwnProperty.call(this.state.errors, key)) {
                    const element = this.state.errors[key]
    
                    if(element) {
                        error = true
                        break
                    }
                }
            }
    
            this.setState({ error })
        }

        iterateValidators = (value) => {
            if(!this.props.validators?.length) return true

        
            let passesRegEx
            for(const { negate, regex } of this.props.validators) {
                passesRegEx = negate ? !regex.test(value) : regex.test(value)
                if(!passesRegEx) break
            }
        
            return passesRegEx
        }

        render(){
            return WrappedComponent({
                onChange: (event) => {
                    this.setError(true)
                    const isValid = event.target.checkValidity() && this.iterateValidators(event.target.value)
                    this.setState({ isValid })
                    this.setErrors({ [this.props.inputOptions.name]: skip ? false : !isValid })
                    this.setModel({ [this.props.inputOptions.name]: event.target.value })
                },
                isValid: this.state.isValid,
                ...this.props
            })
        }
    }
}

export default WrappedComponent => skip => withValidators(WrappedComponent, skip)