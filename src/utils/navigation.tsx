import { useNavigate, useParams } from "react-router-dom";


export const readParams= (Component:any) => {
    const Wrapper =(props:any) =>{
        const params = useParams()

        return(
            <Component {...props} params={params}/>
        )
    }
    return Wrapper;

}