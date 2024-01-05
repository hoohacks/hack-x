import { createElement } from "react";

export default function DatePicker({ value, onChange }: any) {

    return createElement('input', {
        type: 'date',
        value: value ? value.toISOString().split('T')[0] : '', // Ensure the correct format
        onChange: (e: any) => {
            const enteredDate = e.target.value;

            // Check if the entered date is valid
            if (/^\d{4}-\d{2}-\d{2}$/.test(enteredDate)) {
                const selectedDate = new Date(enteredDate + 'T00:00:00'); // Convert to Date object
                onChange(selectedDate);
            } else {
                // Handle invalid date (optional)
                console.error('Invalid date entered:', enteredDate);
                // You can provide user feedback or take appropriate action here
            }
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