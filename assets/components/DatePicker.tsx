import { createElement } from "react";

export default function DatePicker({ value, onChange }: any) {

    return createElement('input', {
        type: 'date',
        value: value.toISOString().split('T')[0], // Ensure the correct format
        onChange: (e: any) => {
            const selectedDate = new Date(e.target.value + 'T00:00:00'); // Convert to Date object
            onChange(selectedDate);
        },
        defaultValue: "Birthday",
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