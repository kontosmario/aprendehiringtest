import React, { useState, useEffect } from 'react'
import axios from 'axios'; 

const MyModule = () => {

  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState([]);
  const [four, setFour] = useState(4);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const query = 'https://qa.aprende.dev/wp-json/aprende/v1/ap-master-class';
    const FetchMyApi = async () => {
      const data = await axios.get(query)
      setCourses(data.data);
      const categories = data.data.map((category, i) => category.taxonomy['master-class-category']['0']);
      const categoryFiltered = categories.filter(e => e);
      setCategory(categoryFiltered);
     
    }

    FetchMyApi();
  
  }, [])
  
  console.log(courses);  
  console.log(category);

  return (
          <>
            <div className="master-class__title-box">
                <h2>
                    Explora todas nuestras Clases Magistrales
                </h2>
            </div>
            <div className="master-class__category-selector">
                <button className="master-class__selector active-selector" onClick={()=> setFilter()}>Todas</button>
                <button className="master-class__selector" onClick={()=> setFilter('Chocolatería')}>Chocolateria</button>
                <button className="master-class__selector" onClick={()=> setFilter('Manicure')}>Manicure</button>
            </div>
            <div className="master-class__class-grid">
              {courses.slice(0,four).map((course, i) =>
              <>
                {course.taxonomy['master-class-category']['0']['name'] != "undefined" ?
                  <div className="master-class__card-course" key={i}>
                  <div className="master-class__image-course">
                      <img src={course.meta.thumbnail.url} alt="" />
                  </div>
                  <div className="master-class__description-course">
                      <h5>
                        {course.title.rendered}
                      </h5>
                      {course.taxonomy['master-class-category']['0']['name']}
                  </div>
                  <button className="master-class__see-course-btn">
                      ver clase
                  </button>
                </div>
                
                :

                <div className="master-class__card-course" key={i}>
                  Nothing here
                </div>
                  
                }
              </>
              )}
            </div>
            <button className="master-class__see-more-btn" onClick={()=> {
              let number = four;
              number += 4
              setFour(number)
            }}>
                Ver más
            </button>
          </>

  )
}

export default MyModule