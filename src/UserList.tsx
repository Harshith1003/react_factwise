import React, { useState } from 'react';
import celebrities from './celebrities.json';
import UserListItem from './UserListItem';
import {BsSearch} from 'react-icons/bs';

interface User {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(celebrities);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAccordionClick = (userId: number) => {
    setActiveAccordion((prevActive) => (prevActive === userId ? null : userId));
    setEditMode(null);
  };

  const handleEditClick = (userId: number) => {
    setActiveAccordion(userId);
    setEditMode(userId);
  };

  const handleInputChange = (userId: number, field: string, value: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };



  const handleSaveClick = (userId: number) => {
    setEditMode(null);
  };

  const handleCancelClick = (userId: number) => {
    setEditMode(null);
  };

  const handleDeleteClick = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setEditMode(null);
        setActiveAccordion(null);
      }
  };
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:10}}>
      <div className='box'>
      <BsSearch aria-hidden="true"/>
        <input 
          type="text"
          className='seabar'
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search User"
        />
      </div>
      {filteredUsers.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          active={activeAccordion === user.id}
          editMode={editMode === user.id}
          onAccordionClick={handleAccordionClick}
          onEditClick={handleEditClick}
          onSaveClick={handleSaveClick}
          onCancelClick={handleCancelClick}
          onDeleteClick={handleDeleteClick}
          onInputChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default UserList;
