export const checkLocalStorage = () =>
{
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('feature_test', 'yes');
            if (localStorage.getItem('feature_test') === 'yes') {
                localStorage.removeItem('feature_test');
                // localStorage is enabled
                console.log('Local Enabled')
                return true
            } else {
                // localStorage is disabled
                console.log('Local Disabled')
                return false
            }
        } catch(e) {
            // localStorage is disabled
            console.log('Local Disabled', e)
            return false
        }
    } else {
        // localStorage is not available
        console.log('Local Not Available')
        return false
    }
}

export const setToLocalStorage = (key, value) => {
    try {
        checkLocalStorage();
        localStorage.setItem(key, value);
    } catch (error) {
        alert(`${error} : Please enable local storage`);
    }
}

export const getUser = () => {
    if(!(localStorage.getItem('loggedIn')))  return {};
    const id = localStorage.getItem('loggedIn')
    if(!id) return {};
    const user = localStorage.getItem(id);
    return user;
} 
