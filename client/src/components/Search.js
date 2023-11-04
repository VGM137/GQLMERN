import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState('')
  const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    history(`/search/${query}`)
  }

  return (
    <Form className="d-flex" onSubmit={e => handleSubmit(e)}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={e => setQuery(e.target.value)}
      />
      <Button variant="outline-success" type="submit">Search</Button>
    </Form>

  
  )
}

export default Search;