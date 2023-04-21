import { useEffect, useRef, useState } from "react"



export const useSearch = () => {
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true);
  
    useEffect(() => {

        if( isFirstInput.current ){
            isFirstInput.current = query === '' ;
            return
        }

        if( query === '' ){
            setError('A entrada não pode estar vazia');
            return
        }
    
        if( query.match(/^\d+$/) ) {
            setError('Não é possível procurar um filme com um número')
            return
        }
    
        if( query.length < 3 ) {
            setError('A pesquisa deve ter no mínimo 3 caracteres')
            return
        }

        setError(null)
      
    }, [query])
    
    return {
      query,
      setQuery,
      error
    }
    
  }