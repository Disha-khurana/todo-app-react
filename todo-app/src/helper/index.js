export const formatDate = (str) => {
    const date = new Date(str)
    const year=`${date.getFullYear()}`;
    const month=`${(date.getMonth() + 1).toString().padStart(2,'0')}`;
    const newdate=`${(date.getDate()).toString().padStart(2,'0')}`;
    const time = `${date.toLocaleString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })}`;

    const format = `${newdate}/${month}/${year}    ${time}`                          
    
    return format;
}

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};











