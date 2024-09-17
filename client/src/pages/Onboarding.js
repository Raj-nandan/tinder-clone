import React from 'react'
import { useState } from 'react'
import Nav from '../components/Nav'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Onboarding = () => {

  const [cookies, setCookie, removeCookie] = useCookies(null)

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    email: "",
    url: "",
    about: "",
    matches: []
  })

  let navigate = useNavigate()

  const handleSubmit = async(e) => {
    console.log("submitted");
    e.preventDefault()

    try {
      const response = await axios.put('http://localhost:8000/user', { formData })
      const success = response.status === 200
      if (success) {
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleChange = (e) => {
    console.log('e' + e)
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    const name = e.target.name

    console.log('value ' + value, 'name ' + name)

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      url: url,
      file: null // Clear file when URL is entered
    }))
  }
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        file: file,
        url: '' // Clear URL when file is selected
      }))
    }
  }

  console.log(formData)

  return (
    <div>
      <Nav minimal={true} setShowModal={() => { }} showModel={false} />

      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple_input_container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="other-gender-identity"
                type="radio"
                name="gender_identity"
                value={"other"}
                onChange={handleChange}
                checked={formData.gender_identity === 'other'}
              />
              <label htmlFor="other-gender-identity">Other</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />


            <label >My Interest</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_interest === 'man'}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_interest === 'woman'}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="other-gender-interest"
                type="radio"
                name="gender_interest"
                value={"other"}
                onChange={handleChange}
                checked={formData.gender_interest === 'other'}
              />
              <label htmlFor="other-gender-interest">Other</label>
            </div>

            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like to have late night walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />

          </section>

        

          <section>
            <label htmlFor="url">Profile Picture URL</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleUrlChange}
              value={formData.url}
              placeholder="Enter image URL"
              disabled={!!formData.file}
            />
            <label htmlFor="file-upload">Or upload an image:</label>
            <input
              type="file"
              id="file-upload"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ border: 'none', outline: 'none' }}
              disabled={!!formData.url}
            />
            <div className="photo-container">
              {formData.url && <img src={formData.url} alt="profile preview" />}
              {formData.file && <img src={URL.createObjectURL(formData.file)} alt="profile preview" />}
            </div>
          </section>

        </form>

      </div>
    </div>
  )
}

export default Onboarding
