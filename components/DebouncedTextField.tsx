import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import useDebounce from "../lib/useDebounce";

const DebouncedTextField = forwardRef<any, TextFieldProps>((props, ref) => {
    const {onChange, value, ...rest} = props;

    const [localValue, setLocalValue] = useState(value);

    const debouncedValue:string = useDebounce(localValue, 350);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    }

    useEffect(() => {
        if (debouncedValue !== value) {
            onChange({target: {value: debouncedValue}} as ChangeEvent<HTMLInputElement>)
        }
    }, [debouncedValue, value])

    return <TextField ref={ref} value={localValue} onChange={handleChange} {...rest}/>
})

export default DebouncedTextField