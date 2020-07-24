/*const parseObject = object => {
    let result = [];
    Object.values(object).forEach(item => {
        if (item instanceof Object) {
            result = result.concat(Object.values(item))
        }
        else {
            result.push(item);
        }
    })
    return result;
}*/

const normalizeObject = object => {
    const array = [];
    object.forEach(item => {
        const result = {}
        const keys = parseKeys([item])
        let values = []
        if (item)
            Object.values(item).forEach(value => {
                if (value instanceof Object)
                    values = values.concat(Object.values(value))
                else
                    values.push(value)
            })
        keys.forEach((key, i) => result[key] = values[i]);
        array.push(result)
    })
    return array
}

const parseKeys = object => {
    let example = object[0] // object[0]
    let keys = [];
    if (!example)
        return
    for (const [key, value] of Object.entries(object[0])) {
        if (value instanceof Object)
            keys = keys.concat(Object.keys(value))
        else
            keys.push(key);
    }
    return keys;
}

const normalizeString = string =>  string.length > 25 ?string.slice(0, 25) + "..." : string;

export {/*parseObject,*/ normalizeString, parseKeys, normalizeObject}