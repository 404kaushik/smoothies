import supabase from "../config/supabaseClient"
import SmoothieCard from "../components/SmoothieCard"
import React, { useEffect, useState } from "react"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const {data, error} = await supabase
        .from("smoothies")
        .select()
        
        if (error) {
          setFetchError('Could not fetch the smoothies')
          setSmoothies(null)
          console.log(error)
        }
        if (data){
          setSmoothies(data)
          setFetchError(null)
        }
    }
    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p className="error">{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">          
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home