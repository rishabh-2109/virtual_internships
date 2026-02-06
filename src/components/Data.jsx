import axios from 'axios';
import { useEffect, useState } from 'react'

const Data = () => {
    const [response, setResponse] = useState([]);
    useEffect(()=>{
       const fetchData=async()=>{
        try{
            const res=await axios.get(`https://dummyjson.com/products?limit=10&skip=10`);
            setResponse(res.data.products);
        }catch(error){
            console.log(error);
        }
       }
       fetchData();
    },[])
  return (
    <div style={{backgroundColor:'pink' , margin:'10px', width:'100vw'}}>
        {
            response.map((item,index)=>(
                <div key={item.id}>{item.title}</div>
            ))
        }
    </div>
  )
}

export default Data