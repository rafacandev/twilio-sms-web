import {useState} from "react";

const InputField = ({ value='',
                      label='Label',
                      pristineHint='Enter a value',
                      invalidHint='Invalid value',
                      validHint='',
                      validation=()=>null,
                      placeholder='Input placeholder',
                      isRequired=false,
                      type='text',
                      onChange=()=>{}}) => {
  const [isPristine, setPristine] = useState(true);
  const validationValue = validation(value)
  const isValid = validationValue === null ? false : validationValue
  const labelClass = `form-label ${ isPristine || isValid ? '' : 'has-error'}`
  const showInvalid = !isPristine && !isValid
  const showValid = !isPristine && isValid
  return <label className={labelClass}>{label}:{isRequired && <sup className="text-error">&lowast; </sup>}
    <input
      type={type}
      className="form-input"
      placeholder={placeholder}
      required={isRequired}
      value={value}
      onChange={onChange}
      onBlur={() => setPristine(false)}/>
    {showValid && <span className="form-input-hint">{validHint}</span>}
    {showInvalid && <span className="form-input-hint">{invalidHint}</span>}
    {isPristine && <span className="form-input-hint">{pristineHint}</span>}
  </label>
}

export default InputField