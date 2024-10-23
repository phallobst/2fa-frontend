import {Component, render} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import Table from './table.jsx';

// API URL for fetching categories
const API_URL = 'https://raw.githubusercontent.com/2factorauth/2fa.directory/refs/heads/master/data/categories.json';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  // Fetch categories from the API
  useEffect(() => {
    fetch(API_URL).
      then(res => res.json()).
      then(data => setCategories(Object.entries(data) || [])).
      catch(err => console.error('Error fetching categories:', err));  // Add error handling
  }, []);



  // Render a list of category buttons
  return (
    <>
      {categories.map(([key, category], index) => (
        <>
          <div>
            <Button key={key} name={key} category={category} setSelectedCategory={setSelectedCategory} activeCategory={selectedCategory} />
          </div>
          {/* Render the table after the button div but outside of it */}
          {selectedCategory === key && <Table Category={key} Title={category.title} Order={index} />}
        </>
      ))}
    </>
  );
}

function Button({name, category, setSelectedCategory, activeCategory}) {

  const handleCategoryClick = () => {
    setSelectedCategory(prevSelected => (prevSelected === name ? null : name));
  };

  return (
    <div>
      <button class={`category-btn${ activeCategory === name ? ' active' : '' }`}
              onClick={handleCategoryClick}
              href={`#${name}`}
              aria-controls={name}>
        <span
          aria-hidden="true"
          className="category-icon"
          dangerouslySetInnerHTML={{__html: category.icon}}
        />
        {category.title}
      </button>
    </div>
  );
}

render(<Categories/>, document.getElementById('categories'));
