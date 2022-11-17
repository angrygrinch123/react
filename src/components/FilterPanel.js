import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { useState } from "react";


export default function FilterPanel({addFilter, removeFilter}){
    const [isSorted, setSortState] = useState(false);
    const [isActive, setActiveFilter] = useState(false);
    const [isPhdStudent, setPhdFilter] = useState(false);
    
    function changeSortState(){
        setSortState(!isSorted);
        addFilter("sortByMentees");
    }
 
    function handleActiveFilterState(){
      const newState = !isActive;
      setActiveFilter(newState);
      newState ? addFilter("filterActiveStudents") : removeFilter("filterActiveStudents");
    }

    function handlePhdFilterState(){
      const newState = !isPhdStudent;
      setPhdFilter(newState);
      newState ? addFilter("filterPhdStudents") : removeFilter("filterPhdStudents");
    }

    return(
        <Card style={{ width: '30rem' }} bg={"light"} className="profileCard">
        <Card.Body>
          <Card.Title>
            Filter Options
          </Card.Title>
          <Card.Subtitle>

          </Card.Subtitle>
          <Container>
            <Row>
              <Form.Check 
                 type="radio"
                 checked={isSorted}
                 onChange={changeSortState}
                 label = " Sort By Number of Students Mentored"
                 id = "filter-1"
                />
                 <Form.Check 
                 type="checkbox"
                 checked={isActive}
                 onChange={handleActiveFilterState}
                 label = "Current Students"
                 id = "filter-2"
                />
                <Form.Check 
                 type="checkbox"
                 checked={isPhdStudent}
                 onChange={handlePhdFilterState}
                 label = "PhD Students"
                 id = "filter-3"
                />
             
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
}