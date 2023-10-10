import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown ,Input} from 'semantic-ui-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Read() {
    const [APIData, setAPIData] = useState([]);
    const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || 'A-Z');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`https://65225df6f43b179384146c7e.mockapi.io/userData`)
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    useEffect(() => {
        let sortedData = [...APIData];
        switch(sortOption) {
            case 'A-Z':
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Z-A':
                sortedData.sort((a, b) => b.name.localeCompare(a.name));
                break;
                case 'Last modified':
                  sortedData.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
                  break;
              case 'Last Inserted':
                  sortedData.sort((a, b) => b.id - a.id);
                  break;
              default:
                  break;
        }
        setAPIData(sortedData);
    }, [sortOption]);
   
    const filteredData = APIData.filter(data => {
      
      return (
          data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
          setLoading(false)
      );
  });

    const handleSortChange = (value) => {
        setSortOption(value);
        localStorage.setItem('sortOption', value);
    };

    const setData = (data) => {
        let { id, name, email, mobile } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Email', email);
        localStorage.setItem('Mobile', mobile);
    };

    const onDelete = (id) => {
        axios.delete(`https://65225df6f43b179384146c7e.mockapi.io/userData/${id}`)
            .then(() => {
                getData();
            });
    };
    const onUpdate = (data) => {
      setData(data);
      navigate('/update');
  };

    const getData = () => {
        axios.get(`https://65225df6f43b179384146c7e.mockapi.io/userData`)
            .then((getData) => {
                setAPIData(getData.data);
            });
    };

    const navigate = useNavigate();

    return (
        <div  >
          {loading === false &&
          <>
            <h2 className='main-header'>User data</h2>
            <Input 
                placeholder='Search by Name, Mobile, or Email...' 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
  
            <Dropdown
                 style={{ marginLeft: '20px' }}
                placeholder='Select Filter'
                selection
                value={sortOption}
                options={[
                    { key: 'A-Z', value: 'A-Z', text: 'A-Z' },
                    { key: 'Z-A', value: 'Z-A', text: 'Z-A' },
                    { key: 'Last modified', value: 'Last modified', text: 'Last modified' },
                    { key: 'Last Inserted', value: 'Last Inserted', text: 'Last Inserted' }
                ]}
                onChange={(e, { value }) => handleSortChange(value)}
            />

            <table class="table mt-2" >
            <thead>
                                <tr >
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Update</th>
                                    <th scope="col"l>Delete</th>
                                </tr>
                      </thead>

                      <tbody>
                                  {filteredData.map((data) => {
                                    return (
                                      <tr>
                                          <th scope="col">{data.name}</th>
                                          <th scope="col">{data.email}</th>
                                          <th scope="col">{data.mobile}</th>          
                                          <th scope="col"><Button onClick={() => onUpdate(data)} >Update</Button></th>
                                          <th scope="col"> <Button onClick={() => onDelete(data.id)}>Delete</Button></th>
                                      </tr>
                                  )})}

                      </tbody> 
            </table>

            <Button onClick={() => navigate('/dashboard')} >Go back</Button>
            </>
         }
        </div>
    );
}

export default Read;


