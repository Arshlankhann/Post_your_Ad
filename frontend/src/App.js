import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    property_type: '',
    bhk: '',
    bathrooms: '',
    furnishing: '',
    project_status: '',
    listed_by: '',
    super_builtup_area: '',
    carpet_area: '',
    maintenance: '',
    total_floors: '',
    floor_no: '',
    parking: '',
    facing: '',
    project_name: '',
    ad_title: '',
    description: '',
    price: '',
    state: '',
    city: '',
    user_name: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [imagePreviews, setImagePreviews] = useState([]);

  const fileInputRef = useRef(null);


  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [imagePreviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      const response = await fetch(`${apiUrl}/api/ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || 'Something went wrong');
      }

      setMessage(result.msg);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhotoUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newPreviews.push({
          url: URL.createObjectURL(file),
          file: file
        });
      }
    });

    setImagePreviews(prevPreviews => {
      const combined = [...prevPreviews, ...newPreviews];
      if (combined.length > 20) {
        alert('You can only upload a maximum of 20 photos.');
        const excessPreviews = combined.slice(20);
        excessPreviews.forEach(p => URL.revokeObjectURL(p.url));
        return combined.slice(0, 20);
      }
      return combined;
    });

    e.target.value = null;
  };

  const handleRemoveImage = (indexToRemove) => {
    URL.revokeObjectURL(imagePreviews[indexToRemove].url);
    setImagePreviews(prevPreviews =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  const renderRadioGroup = (name, options) => (
    <div className="choice-group">
      {options.map(option => (
        <label key={option.value} className={formData[name] === option.value ? 'selected' : ''}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={formData[name] === option.value}
            onChange={handleChange}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="container">
      <h1>Post your ad</h1>

      {message && <div style={{ color: 'green', textAlign: 'center', padding: '10px', border: '1px solid green', marginBottom: '20px' }}>{message}</div>}
      {error && <div style={{ color: 'red', textAlign: 'center', padding: '10px', border: '1px solid red', marginBottom: '20px' }}>{error}</div>}

      <form id="ad-form" noValidate onSubmit={handleSubmit}>
        <div className="main-content">

          <div className="selected-category-box">
            <div className="selected-category-section">
              <h2>Selected Category</h2>
              <span>Properties / For Sale: Houses & Apartments</span>
              <a href="#/">Change</a>
            </div>
          </div>

          <div className="form-section">
            <h2>Include some details</h2>
            <div className="form-group">
              <label className="form-label">Type *</label>
              {renderRadioGroup('property_type', [
                { value: 'flats_apartments', label: 'Flats / Apartments' },
                { value: 'independent_floors', label: 'Independent / Builder Floors' },
                { value: 'farm_house', label: 'Farm House' },
                { value: 'house_villa', label: 'House & Villa' }
              ])}
            </div>

            <div className="form-group">
              <label className="form-label">BHK *</label>
              {renderRadioGroup('bhk', [
                { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '4+', label: '4+' }
              ])}
            </div>
            <div className="form-group">
              <label className="form-label">Bathrooms *</label>
              {renderRadioGroup('bathrooms', [
                { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '4+', label: '4+' }
              ])}
            </div>
            <div className="form-group">
              <label className="form-label">Furnishing *</label>
              {renderRadioGroup('furnishing', [
                { value: 'furnished', label: 'Furnished' }, { value: 'semifurnished', label: 'Semi-Furnished' }, { value: 'unfurnished', label: 'Unfurnished' }
              ])}
            </div>
            <div className="form-group">
              <label className="form-label">Project Status *</label>
              {renderRadioGroup('project_status', [
                { value: 'new_launch', label: 'New Launch' }, { value: 'ready_to_move', label: 'Ready to Move' }, { value: 'under_construction', label: 'Under Construction' }
              ])}
            </div>
            <div className="form-group">
              <label className="form-label">Listed By *</label>
              {renderRadioGroup('listed_by', [
                { value: 'builder', label: 'Builder' }, { value: 'dealer', label: 'Dealer' }, { value: 'owner', label: 'Owner' }
              ])}
            </div>
            <div className="grid-container grid-container-halves form-group">
              <div className="form-group">
                <label htmlFor="super_builtup_area" className="form-label">Super Builtup area (ft²) *</label>
                <input type="number" id="super_builtup_area" name="super_builtup_area" className="form-input" value={formData.super_builtup_area} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="carpet_area" className="form-label">Carpet Area (ft²) *</label>
                <input type="number" id="carpet_area" name="carpet_area" className="form-input" value={formData.carpet_area} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="maintenance" className="form-label">Maintenance (Monthly) *</label>
              <input type="number" id="maintenance" name="maintenance" className="form-input" value={formData.maintenance} onChange={handleChange} />
            </div>
            <div className="grid-container grid-container-halves form-group">
              <div className="form-group">
                <label htmlFor="total_floors" className="form-label">Total Floors *</label>
                <input type="number" id="total_floors" name="total_floors" className="form-input" value={formData.total_floors} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="floor_no" className="form-label">Floor No *</label>
                <input type="number" id="floor_no" name="floor_no" className="form-input" value={formData.floor_no} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Car Parking *</label>
              {renderRadioGroup('parking', [
                { value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '3+', label: '3+' }
              ])}
            </div>
            <div className="form-group">
              <label htmlFor="facing" className="form-label">Facing *</label>
              <select id="facing" name="facing" className="form-select" value={formData.facing} onChange={handleChange}>
                <option value="">Select</option>
                <option>East</option> <option>West</option> <option>North</option>
                <option>South</option> <option>North-East</option> <option>North-West</option>
                <option>South-East</option> <option>South-West</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="project_name" className="form-label">Project Name</label>
              <input type="text" id="project_name" name="project_name" className="form-input" value={formData.project_name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ad-title" className="form-label">Ad title *</label>
              <input type="text" id="ad-title" name="ad_title" className="form-input" value={formData.ad_title} onChange={handleChange} required />
              <p className="form-hint">Mention the key features of your item (e.g. brand, model, age, type)</p>
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Describe what you are selling *</label>
              <textarea id="description" name="description" rows="4" className="form-textarea" value={formData.description} onChange={handleChange} required></textarea>
              <p className="form-hint">Include condition, features and reason for selling</p>
            </div>
          </div>

          <div className="form-section">
            <h2>Set a price</h2>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Price *</label>
              <div className="price-input-container">
                <span className="price-symbol">₹</span>
                <input type="number" id="price" name="price" className="form-input price-input" value={formData.price} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Upload up to 20 photos</h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              multiple
              accept="image/*"
            />
            <div className="photo-grid" id="photo-grid-container">
              <div className="photo-slot main-photo-upload" onClick={handlePhotoUploadClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Add Photo</span>
              </div>

              {imagePreviews.map((preview, index) => (
                <div key={preview.url} className="photo-slot image-preview">
                  <img src={preview.url} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}

              {Array.from({ length: 19 - imagePreviews.length }).map((_, index) => (
                <div key={`placeholder-${index}`} className="photo-slot placeholder-slot">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Confirm your location</h2>
            <div className="form-group">
              <label htmlFor="state" className="form-label">State *</label>
              <select id="state" name="state" className="form-select" value={formData.state} onChange={handleChange} required>
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">City / Neighbourhood *</label>
              <input type="text" id="city" name="city" className="form-input" value={formData.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-section">
            <h2>Review your details</h2>
            <div className="review-details">
              <img src="https://placehold.co/64x64/002f34/ffffff?text=A" alt="User Avatar" />
              <div className="review-details-text">
                <div className="form-group">
                  <label htmlFor="user_name" className="form-label">Name *</label>
                  <input type="text" id="user_name" name="user_name" className="form-input" value={formData.user_name} onChange={handleChange} required />
                </div>
                <p>Your phone number</p>
                <p className="phone-number">+919119943301</p>
              </div>
            </div>
          </div>

          <div className="post-button-container">
            <button type="submit" className="post-button">Post now</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
