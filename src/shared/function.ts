export const sortArrayObj = (arr: any[], key: string, sort: string) => {
    return arr.sort((a: {}, b: {}) => {
        return sort == 'desc' ? b[key] - a[key] : a[key] - b[key];
    })
}

export const removeDuplicate = (arr: any[], key: string) => {
    let obj = <any>{}, newArr = [];
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i][key].toLowerCase()] = arr[i];
    }

    for(let k in obj){
        newArr.push(obj[k]);
    }
    return newArr;
}