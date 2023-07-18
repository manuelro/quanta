import Quanta from '../../../core/quanta'
import { ref, onMounted, onUnmounted } from 'vue'

export default function(props) {
    const isValid = ref(true)
    const model = ref({})
    const error = ref(true)
    const errors = ref({})

    const setModel = (newModel) => {
        model.value = {...model.value, ...newModel}
    }

    const setError = (newError) => {
        error.value = newError
    }

    const setErrors = (newErrors) => {
        errors.value = {...errors.value, ...newErrors}

        let newError = false
        for (const key in errors.value) {
            if (Object.hasOwnProperty.call(errors.value, key)) {
                const element = errors.value[key]

                if(element) {
                    newError = true
                    break
                }
            }
        }

        error.value = newError
    }

    const iterateValidators = (value) => {
        if(!props.validators?.length) return true

    
        let passesRegEx
        for(const { negate, regex } of props.validators) {
            passesRegEx = negate ? !regex.test(value) : regex.test(value)
            if(!passesRegEx) break
        }
    
        return passesRegEx
    }

    const onChange = (event) => {
        setError(true)
        const newIsValid = event.target.checkValidity() && iterateValidators(event.target.value)
        isValid.value = newIsValid
        setErrors({ [props.inputOptions.name]: props.skip ? false : !newIsValid })
        setModel({ [props.inputOptions.name]: event.target.value })
    }

    onMounted(() => {
        setError(true)
        setErrors({ [props.inputOptions.name]: props.skip ? false : true })
    })

    return {
        isValid, model, error, errors,
        setModel, setError, setErrors, onChange
    }
}
