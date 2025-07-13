import { useState, useEffect } from 'react'
import './App.css'
import Input from './components/Input.jsx'

function App() {
  const [weight, setWeight] = useState(58)
  const [height, setHeight] = useState(178)
  const [bmi, setBMI] = useState(null)

  useEffect(() => {
    if(weight && height) {
      const heightMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (heightMeters * heightMeters)
      const roundedBmi = Math.round(bmi * 10) / 10;
      setBMI(roundedBmi)
    }
  }, [weight, height])
  

  const computeBMI = (e) => {
      e.preventDefault();
      if(weight && height) {
      const heightMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (heightMeters * heightMeters)
      const roundedBmi = Math.round(bmi * 10) / 10;
      setBMI(roundedBmi)
    }
  }

  return (
    <>
      <h1>BMI Calculator</h1>

      {/* BMI Form  */}
      <form className="form-container" id="bmiForm">
      <div className='input-row'>
        <div className='input-group'>
        <label 
          className='input-label'> 
          Weight (in kg)
        </label>
        <Input 
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <label 
          className='input-label'> 
          Height (in cm)
        </label>
        <Input 
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        </div>
      </div>
  
      {bmi && (
      <div className="mt-6 p-2 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Your BMI is:
        </h3>
        <p className="text-2xl font-bold text-green-600">
          {bmi}
        </p>
      </div>
      )}

      {/* <div className="card">
        <button 
          className='calculate-btn'
          onClick={computeBMI}
        >
            Calculate BMI
        </button>
      </div> */}

      </form>
    </>
  )
}

export default App
