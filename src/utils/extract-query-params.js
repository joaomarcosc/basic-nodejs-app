/* 

0: ?search=Joao&teste=tres

1: substr(1) -> search=Joao&teste=tres

2: split("&") -> ['search=Joao', 'teste=tres']

3: reduce -> { search: "Joao", teste: "Tres"}

*/
export function extractQueryParams(query) {
    return query.substr(1).split("&").reduce((queryParams, param) => {
        const [key, value] = param.split("=")

         queryParams[key] = value

         return queryParams
    }, {})
}