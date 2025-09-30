import { useState, useEffect } from "react";

const useDisplayForm = () => {
    const [displayForm, setDisplayForm] = useState(null);
    useEffect(() => {
        console.log('displayForm state changed:', displayForm);
    }, [displayForm]);
    return [ displayForm, setDisplayForm ];
}

export default useDisplayForm;