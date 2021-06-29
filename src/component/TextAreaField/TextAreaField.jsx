import {useState} from "react";

const TextAreaField = ({ value='',
                         label='Label',
                         pristineHint='Enter a value',
                         invalidHint='Invalid value',
                         validHint='',
                         validation=()=>null,
                         placeholder='Input placeholder',
                         isRequired=false,
                         rows=5,
                         onChange=()=>{}}) => {
  const [isPristine, setPristine] = useState(true);
  const validationValue = validation(value)
  const isValid = validationValue === null ? false : validationValue
  const labelClass = `form-label ${ isPristine || isValid ? '' : 'has-error'}`
  const showInvalid = !isPristine && !isValid
  const showValid = !isPristine && isValid
  return <label className={labelClass}>{label}:{isRequired && <sup className="text-error">&lowast; </sup>}
    <textarea
      className="form-input"
      placeholder={placeholder}
      required={isRequired}
      value={value}
      rows={rows}
      onChange={onChange}
      onBlur={() => setPristine(false)}>
    </textarea>
    {showValid && <span className="form-input-hint">{validHint}</span>}
    {showInvalid && <span className="form-input-hint">{invalidHint}</span>}
    {isPristine && <span className="form-input-hint">{pristineHint}</span>}
  </label>
}

export default TextAreaField