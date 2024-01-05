import { createElement } from "react";

export default function NumberInput({ value, onChange }: any) {

    return createElement('input', {
        type: 'number',
        value: value,
        onInput: onChange,
        style: {
            width: "100%",
            height: 52,
            padding: 10,
            fontSize: 16,
            color: "#121A6A",
            marginTop: 8,
            marginBottom: 8,
        },
    });

}