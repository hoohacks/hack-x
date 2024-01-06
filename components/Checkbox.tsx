import { createElement } from "react";

export default function Checkbox({ value, onChange }: any) {

    return createElement('input', {
        type: 'checkbox',
        value: value,
        onInput: onChange,
        style: {
            width: 318,
            height: 58,
        },
    });

}